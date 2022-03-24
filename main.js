const core = require('@actions/core')
const { Octokit } = require('@octokit/rest')
const octokit = new Octokit()

const owner = core.getInput('owner')
const repo = core.getInput('repo')

async function run () {
  try {
    const lastRelease = await octokit.repos.getLatestRelease({
      owner: owner,
      repo: repo
    })
    if (lastRelease) {
      core.setOutput('release', lastRelease.tag_name)
      core.setOutput('id', String(lastRelease.id))
      core.setOutput('body', lastRelease.body)
    } else {
      core.setFailed("Don't have a last release")
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
