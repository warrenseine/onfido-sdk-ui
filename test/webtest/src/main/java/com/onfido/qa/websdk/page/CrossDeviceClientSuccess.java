package com.onfido.qa.websdk.page;

import com.onfido.qa.webdriver.Driver;
import org.openqa.selenium.By;

public class CrossDeviceClientSuccess extends BasePage {

    public CrossDeviceClientSuccess(Driver driver) {
        super(driver);
    }

    @Override
    protected By pageId() {
        return pageIdSelector("CrossDeviceClientSuccess");
    }
}