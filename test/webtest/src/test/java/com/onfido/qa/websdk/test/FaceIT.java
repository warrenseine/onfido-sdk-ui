package com.onfido.qa.websdk.test;

import com.onfido.qa.annotation.Browser;
import com.onfido.qa.annotation.Mobile;
import com.onfido.qa.websdk.UploadDocument;
import com.onfido.qa.websdk.page.Complete;
import com.onfido.qa.websdk.page.ConfirmUpload;
import com.onfido.qa.websdk.page.CrossDeviceIntro;
import com.onfido.qa.websdk.page.FaceVideo;
import com.onfido.qa.websdk.page.FaceVideoIntro;
import com.onfido.qa.websdk.page.Permission;
import com.onfido.qa.websdk.page.SelfieCamera;
import com.onfido.qa.websdk.page.SelfieIntro;
import com.onfido.qa.websdk.page.SelfieUpload;
import com.onfido.qa.websdk.sdk.EnterpriseFeatures;
import com.onfido.qa.websdk.sdk.FaceStep;
import com.onfido.qa.websdk.sdk.Raw;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import static com.google.common.truth.Truth.assertThat;
import static com.onfido.qa.websdk.UploadDocument.FACE;
import static com.onfido.qa.websdk.UploadDocument.NATIONAL_IDENTITY_CARD_PDF;
import static com.onfido.qa.websdk.UploadDocument.OVER_10MB_FACE;
import static com.onfido.qa.websdk.sdk.FaceStep.Variant.VIDEO;

public class FaceIT extends WebSdkIT {

    public static final String WITHOUT_VIDEO_CSS = "video.onfido-sdk-ui-Camera-video { display: none; }";
    public static final String BRAND_NAME = "[COMPANY/PRODUCT NAME]";

    public FaceIT() {
    }

    public FaceIT(String language) {
        super(language);
    }

    @DataProvider
    public static Object[][] faceJpegs() {
        return new Object[][]{
                {FACE},
                {OVER_10MB_FACE}
        };
    }

    @Test(description = "should be taken to the cross device screen if browser does not have Webcam Support")
    @Browser(enableMicrophoneCameraAccess = true)
    public void testFallbackToCrossDeviceWithoutWebcamSupport() {

        onfido().withSteps(new FaceStep().withRequestedVariant(VIDEO))
                .beforeInit(this::disableWebcam)
                .init(CrossDeviceIntro.class);

    }

    @Test(description = "should be taken to the cross device screen if browser does not have MediaRecorder API and faceVideo variant requested")
    @Browser(enableMicrophoneCameraAccess = true)
    public void testFallbackToCrossDeviceWithoutMediaRecorderSupport() {

        onfido().withSteps(new FaceStep().withRequestedVariant(VIDEO))
                .beforeInit(this::disableMediaRecorder)
                .init(SelfieIntro.class);
    }

    @Test(description = "should be taken to the selfie screen if browser does not have MediaRecorder API and faceVideo variant requested")
    @Browser(enableMicrophoneCameraAccess = true)
    @Mobile
    public void testFallbackToSelfieScreenWithoutMediaRecorderSupport() {

        onfido().withSteps(new FaceStep().withRequestedVariant(VIDEO))
                .beforeInit(this::disableMediaRecorder)
                .init(SelfieIntro.class);

    }

    @Test(description = "should return unsupported file type error for selfie")
    public void testUnsupportedFileTypeForSelfie() {
        var confirmUpload = onfido().withSteps(new FaceStep().withUseUploader(true))
                                    .init(SelfieUpload.class)
                                    .upload(NATIONAL_IDENTITY_CARD_PDF)
                                    .clickConfirmButton(ConfirmUpload.class);

        assertThat(confirmUpload.isErrorShown()).isTrue();
        verifyCopy(confirmUpload.errorTitle(), "generic.errors.unsupported_file.message");
    }


    @Test(description = "should upload selfie", dataProvider = "faceJpegs")
    public void testUploadForSelfie(UploadDocument document) {
        onfido().withSteps(new FaceStep().withUseUploader(true), "complete")
                .init(SelfieUpload.class)
                .upload(document)
                .clickConfirmButton(Complete.class);

    }

    @Test(description = "should take one selfie using the camera stream", groups = {"percy"})
    @Browser(enableMicrophoneCameraAccess = true)
    public void testSelfieUsingCameraStream() {
        var selfieIntro = onfido().withSteps(new FaceStep(), "complete")
                                  .init(SelfieIntro.class);

        takePercySnapshot("selfie-intro");

        var camera = selfieIntro.clickContinue(SelfieCamera.class);

        takePercySnapshot("selfie-capture-without-video", WITHOUT_VIDEO_CSS);

        assertThat(camera.onfidoFooterIsVisible()).isTrue();

        camera.record().clickConfirmButton(Complete.class);

    }

    @Test(description = "should complete the flow when snapshot is disabled")
    @Browser(enableMicrophoneCameraAccess = true)
    public void testCompleteFlowWhenSnapshotISDisabled() {
        onfido().withSteps(new FaceStep().withUseMultipleSelfieCapture(false), "complete")
                .init(SelfieIntro.class)
                .clickContinue(SelfieCamera.class)
                .record()
                .clickConfirmButton(Complete.class);
    }

    @Test(description = "should be taken to the selfie screen if browser does not have MediaRecorder API and faceVideo variant requested")
    @Mobile
    public void testSelfieScreenIfNoMediaRecorderAvailableAndFaceVideoVariantRequested() {

        onfido().withSteps(new FaceStep().withRequestedVariant(VIDEO))
                .beforeInit(this::provideVideoDevice)
                .beforeInit(this::disableMediaRecorder)
                .init(SelfieIntro.class)
                .clickContinue(Permission.class);

        // TODO: this test actually doesn't test what the description says

    }

    @Test(description = "should be taken to the cross-device flow if browser does not have MediaRecorder API, facial liveness video variant requested and photoCaptureFallback is disabled")
    public void testCrossDeviceWithoutMediaRecorder() {
        onfido().withSteps(new FaceStep().withRequestedVariant(VIDEO).withPhotoCaptureFallback(false))
                .beforeInit(this::disableMediaRecorder)
                .init(CrossDeviceIntro.class);
    }

    @Test(description = "should enter the facial liveness video flow if I have a camera and liveness video variant requested", groups = {"percy"})
    @Browser(enableMicrophoneCameraAccess = true)
    public void testFacialLivenessVideo() {
        var intro = onfido().withSteps(new FaceStep().withRequestedVariant(VIDEO))
                            .beforeInit(this::provideVideoDevice)
                            .init(FaceVideoIntro.class);

        takePercySnapshot("face-video-intro");

        intro.recordVideo().clickEnableCamera(FaceVideo.class);

        takePercySnapshot("face-video-record", WITHOUT_VIDEO_CSS);

    }

    @Test(description = "should enter the facial liveness video flow and display timeout notification after 10 seconds", groups = {"percy"})
    @Browser(enableMicrophoneCameraAccess = true)
    public void testFacialVideoTimeout() {
        var faceVideo = onfido().withSteps(new FaceStep().withRequestedVariant(VIDEO))
                                .beforeInit(this::provideVideoDevice)
                                .init(FaceVideoIntro.class)
                                .recordVideo()
                                .clickEnableCamera(FaceVideo.class);

        faceVideo.waitForWarningMessage(12);

        assertThat(faceVideo.isOverlayPresent()).isFalse();

        takePercySnapshot("face-video-record-warning", WITHOUT_VIDEO_CSS);
    }

    @Test(description = "should not show any logo, including cobrand text and logo if both showCobrand and hideOnfidoLogo are enabled for facial liveness video")
    @Browser(enableMicrophoneCameraAccess = true)
    public void testNotShowAnyLogo() {
        var enterpriseFeatures = new EnterpriseFeatures()
                .withCobrand(new EnterpriseFeatures.EnterpriseCobranding(BRAND_NAME))
                .withHideOnfidoLogo(true);

        var videoIntro = onfido().withSteps(new FaceStep().withRequestedVariant(VIDEO), "complete")
                                 .withEnterpriseFeatures(enterpriseFeatures)
                                 .beforeInit(this::provideVideoDevice)
                                 .init(FaceVideoIntro.class);

        assertThat(videoIntro.isLogoVisible()).isFalse();

        var permission = videoIntro.recordVideo();
        assertThat(permission.isLogoVisible()).isFalse();

        var faceVideo = permission.clickEnableCamera(FaceVideo.class);
        assertThat(faceVideo.isLogoVisible()).isFalse();

        var confirmUpload = faceVideo.record();
        assertThat(confirmUpload.isLogoVisible()).isFalse();

    }

    @Test(description = "should continue through full flow without problems when using customized API requests but still uploading media to API as normal")
    @Browser(enableMicrophoneCameraAccess = true)
    public void testCustomizedApi() {

        var decoupleResponse = new Raw("() => Promise.resolve({ continueWithOnfidoSubmission: true })");

        var enterpriseFeatures = new EnterpriseFeatures().withUseCustomizedApiRequests(true)
                                                         .withOnSubmitDocument(decoupleResponse)
                                                         .withOnSubmitSelfie(decoupleResponse)
                                                         .withOnSubmitVideo(decoupleResponse);

        onfido().withSteps(new FaceStep(), "confirm")
                .withEnterpriseFeatures(enterpriseFeatures)
                .init(SelfieIntro.class)
                .clickContinue(SelfieCamera.class)
                .record()
                .clickConfirmButton(Complete.class);

        // TODO: we should verify, that the media is correctly uploaded
    }

    @Test(description = "should continue through full flow without problems when using customized API requests and success response is returned from callbacks")
    @Browser(enableMicrophoneCameraAccess = true)
    public void testCustomizedApiSuccess() {

        var successResponse = new Raw("() => Promise.resolve({onfidoSuccessResponse: {id: '123-456-789'}})");

        var enterpriseFeatures = new EnterpriseFeatures().withUseCustomizedApiRequests(true)
                                                         .withOnSubmitDocument(successResponse)
                                                         .withOnSubmitSelfie(successResponse)
                                                         .withOnSubmitVideo(successResponse);

        onfido().withSteps(new FaceStep(), "confirm")
                .withEnterpriseFeatures(enterpriseFeatures)
                .init(SelfieIntro.class)
                .clickContinue(SelfieCamera.class)
                .record()
                .clickConfirmButton(Complete.class);

        // TODO: we should verify, that the media is correctly uploaded
    }
}
