// export const locale = (lang="en") => require(`../../src/locales/${lang}.json`)
export const locale = (lang="en") => require('../../src/locales/en.json')


export const verifyElementCopy = async (element, copy) => {
  const elementText = await element.getText()
  await expect(elementText).to.equal(copy)
}