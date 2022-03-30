const { replaceInFile, getFromFile } = require('./utils/file')
const config = require('./config')
const semverSort = require('semver-sort')

const incrementPackageJsonVersion = async (version) => {
  console.log('⬆️ Setting the package.json version...')

  replaceInFile(
    'package.json',
    /"version": ".*"/,
    () => `"version": "${config.RELEASE_VERSION}"`
  )

  console.log('✅ Success!')
}

const incrementVersionInJSFiddle = async () => {
  console.log('⬆️ Increment version in JSFiddle...')

  replaceInFile(
    'demo/fiddle/demo.details',
    /- https:\/\/assets\.onfido\.com\/web-sdk-releases\/.*\/onfido\.min\.js\n\s{3}- https:\/\/assets\.onfido\.com\/web-sdk-releases\/.*\/style\.css/,
    () =>
      `- https://assets.onfido.com/web-sdk-releases/${
        config.RELEASE_VERSION
      }/onfido.min.js\n${' '.repeat(
        3
      )}- https://assets.onfido.com/web-sdk-releases/${
        config.RELEASE_VERSION
      }/style.css`
  )
  console.log('✅ Success!')
}

// @TODO: Allow LTS version updates
const updateChangelog = async () => {
  const [year, month, day] = new Date().toLocaleDateString().split('/')
  const date = [day, month, year].join('-')

  // replaceInFile(
  //   'CHANGELOG.md',
  //   '## [next-version]',
  //   [`## [next-version]`, `## [${config.RELEASE_VERSION}] - ${date}`].join(
  //     '\n\n'
  //   )
  // )

  /*
      Load links
      add link
      rewrite links
  */
  const previousVersion = await getPreviousVersion(config.RELEASE_VERSION, false, false)
  console.log('getPreviousVersion', previousVersion)
  // replaceInFile(
  //   'CHANGELOG.md',
  //   /^\[next\-version\]\:.*$/m,
  //   `[${config.RELEASE_VERSION}]: https://github.com/onfido/onfido-sdk-ui/compare/6.??.0...${config.RELEASE_VERSION}`,
  // )
}

const getPreviousVersion = async (version, lts = false, rc = false) => {
  const links = await getFromFile('CHANGELOG.md', /^(\[.*]\:.*)$/gm)
  
  let versionList = links.map(i => {
    const [_all, version, link] = i.match(/\[(.*)\]: (.*)/)
    return version
  })

  if (versionList.indexOf(version) === -1) {
    versionList.push(version)
  }

  versionList = semverSort.desc(versionList.slice(2, 500))
  const index = versionList.indexOf(version)

  console.log('index', index, version, versionList[index + 1])
  
  return versionList[index + 1]
}

module.exports = async () => {
  // await incrementPackageJsonVersion()
  // await incrementVersionInJSFiddle()
  await updateChangelog()
  return false
}
