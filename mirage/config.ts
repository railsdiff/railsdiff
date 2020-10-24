import { Collection, Response, Server } from "miragejs";

import AppRegistry from "./registry";

function paginate<T>(
  collection: Collection<T>,
  { number = 1, limit = 25 }
): Collection<T> {
  return collection.slice(limit * (number - 1), limit * number);
}

function normalize(number: number | string) {
  if (typeof number === "string") {
    number = parseInt(number, 10);
  }
  if (isNaN(number) || number < 1) {
    number = 1;
  }
  return number;
}

export default function (this: Server<AppRegistry>) {
  this.get("/repos/:ownerLogin/:repoName/tags", (schema, request) => {
    const owner = schema.findBy("owner", { login: request.params.ownerLogin });

    if (!owner) {
      throw new Error(
        `Could not find owner with login ${request.params.ownerLogin}`
      );
    }

    const repo = owner.repos.models.find(
      (repo) => repo.name === request.params.repoName
    );

    if (!repo) {
      throw new Error(
        `Could not find repo with name ${request.params.repoName}`
      );
    }

    const limit = normalize(request.queryParams["per_page"]);
    const number = normalize(request.queryParams["page"]);
    const tags = paginate(repo.tags, { limit, number });
    const totalPages = Math.ceil(repo.tags.length / limit);
    const links: string[] = [];

    if (number > 1) {
      links.push(
        `</repos/${owner.login}/${repo.name}/tags?page=${Math.min(
          number - 1,
          totalPages
        )}>; rel="prev"`
      );
    }

    if (number < totalPages) {
      links.push(
        `</repos/${owner.login}/${repo.name}/tags?page=${Math.max(
          number + 1,
          0
        )}>; rel="next"`
      );
    }

    return new Response(
      200,
      {
        "Content-Type": "application/json; charset=utf-8",
        Link: links.join(", "),
      },
      tags
    );
  });

  this.get(
    "/repos/:ownerLogin/:repoName/compare/:versions",
    (schema, request) => {
      const [sourceVersion, targetVersion] = request.params.versions.split(
        "...",
        2
      );

      const owner = schema.findBy("owner", {
        login: request.params.ownerLogin,
      });

      if (!owner) {
        throw new Error(
          `Could not find owner with login ${request.params.ownerLogin}`
        );
      }

      const repo = owner.repos.models.find(
        (repo) => repo.name === request.params.repoName
      );

      if (!repo) {
        throw new Error(
          `Could not find repo with name ${request.params.repoName}`
        );
      }

      const sourceTag = repo.tags.models.find(
        (tag) => tag.name === sourceVersion
      );

      if (!sourceTag) {
        throw new Error(`Could not find source tag with name ${sourceVersion}`);
      }

      const targetTag = repo.tags.models.find(
        (tag) => tag.name === targetVersion
      );

      if (!targetTag) {
        throw new Error(`Could not find target tag with name ${targetVersion}`);
      }

      const diff = {
        url:
          "https://api.github.com/repos/nbibler/bundle-gem-output/compare/v2.1.0...v2.1.4",
        html_url:
          "https://github.com/nbibler/bundle-gem-output/compare/v2.1.0...v2.1.4",
        permalink_url:
          "https://github.com/nbibler/bundle-gem-output/compare/nbibler:395fb94...nbibler:ed58399",
        diff_url:
          "https://github.com/nbibler/bundle-gem-output/compare/v2.1.0...v2.1.4.diff",
        patch_url:
          "https://github.com/nbibler/bundle-gem-output/compare/v2.1.0...v2.1.4.patch",
        base_commit: {
          sha: "395fb94763fd8096cf6aa72b11d933e5d0b2fe45",
          node_id:
            "MDY6Q29tbWl0OTIxMTY1ODg6Mzk1ZmI5NDc2M2ZkODA5NmNmNmFhNzJiMTFkOTMzZTVkMGIyZmU0NQ==",
          commit: {
            author: {
              name: "Nathaniel Bibler",
              email: "git@nathanielbibler.com",
              date: "2019-12-16T01:33:16Z",
            },
            committer: {
              name: "Nathaniel Bibler",
              email: "git@nathanielbibler.com",
              date: "2019-12-16T01:33:16Z",
            },
            message:
              '2.1.0\n\nGenerated from: "bundle gem my-gem --coc --mit --test=rspec"',
            tree: {
              sha: "96b37ee850353d12e28ee679a3e2c35c78bf746b",
              url:
                "https://api.github.com/repos/nbibler/bundle-gem-output/git/trees/96b37ee850353d12e28ee679a3e2c35c78bf746b",
            },
            url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/git/commits/395fb94763fd8096cf6aa72b11d933e5d0b2fe45",
            comment_count: 0,
            verification: {
              verified: false,
              reason: "unsigned",
              signature: null,
              payload: null,
            },
          },
          url:
            "https://api.github.com/repos/nbibler/bundle-gem-output/commits/395fb94763fd8096cf6aa72b11d933e5d0b2fe45",
          html_url:
            "https://github.com/nbibler/bundle-gem-output/commit/395fb94763fd8096cf6aa72b11d933e5d0b2fe45",
          comments_url:
            "https://api.github.com/repos/nbibler/bundle-gem-output/commits/395fb94763fd8096cf6aa72b11d933e5d0b2fe45/comments",
          author: {
            login: "nbibler",
            id: 3775,
            node_id: "MDQ6VXNlcjM3NzU=",
            avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/nbibler",
            html_url: "https://github.com/nbibler",
            followers_url: "https://api.github.com/users/nbibler/followers",
            following_url:
              "https://api.github.com/users/nbibler/following{/other_user}",
            gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/nbibler/subscriptions",
            organizations_url: "https://api.github.com/users/nbibler/orgs",
            repos_url: "https://api.github.com/users/nbibler/repos",
            events_url: "https://api.github.com/users/nbibler/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/nbibler/received_events",
            type: "User",
            site_admin: false,
          },
          committer: {
            login: "nbibler",
            id: 3775,
            node_id: "MDQ6VXNlcjM3NzU=",
            avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/nbibler",
            html_url: "https://github.com/nbibler",
            followers_url: "https://api.github.com/users/nbibler/followers",
            following_url:
              "https://api.github.com/users/nbibler/following{/other_user}",
            gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/nbibler/subscriptions",
            organizations_url: "https://api.github.com/users/nbibler/orgs",
            repos_url: "https://api.github.com/users/nbibler/repos",
            events_url: "https://api.github.com/users/nbibler/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/nbibler/received_events",
            type: "User",
            site_admin: false,
          },
          parents: [
            {
              sha: "8ab9767cd4154f6d42355fc8fe7db5046eaa7fff",
              url:
                "https://api.github.com/repos/nbibler/bundle-gem-output/commits/8ab9767cd4154f6d42355fc8fe7db5046eaa7fff",
              html_url:
                "https://github.com/nbibler/bundle-gem-output/commit/8ab9767cd4154f6d42355fc8fe7db5046eaa7fff",
            },
          ],
        },
        merge_base_commit: {
          sha: "395fb94763fd8096cf6aa72b11d933e5d0b2fe45",
          node_id:
            "MDY6Q29tbWl0OTIxMTY1ODg6Mzk1ZmI5NDc2M2ZkODA5NmNmNmFhNzJiMTFkOTMzZTVkMGIyZmU0NQ==",
          commit: {
            author: {
              name: "Nathaniel Bibler",
              email: "git@nathanielbibler.com",
              date: "2019-12-16T01:33:16Z",
            },
            committer: {
              name: "Nathaniel Bibler",
              email: "git@nathanielbibler.com",
              date: "2019-12-16T01:33:16Z",
            },
            message:
              '2.1.0\n\nGenerated from: "bundle gem my-gem --coc --mit --test=rspec"',
            tree: {
              sha: "96b37ee850353d12e28ee679a3e2c35c78bf746b",
              url:
                "https://api.github.com/repos/nbibler/bundle-gem-output/git/trees/96b37ee850353d12e28ee679a3e2c35c78bf746b",
            },
            url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/git/commits/395fb94763fd8096cf6aa72b11d933e5d0b2fe45",
            comment_count: 0,
            verification: {
              verified: false,
              reason: "unsigned",
              signature: null,
              payload: null,
            },
          },
          url:
            "https://api.github.com/repos/nbibler/bundle-gem-output/commits/395fb94763fd8096cf6aa72b11d933e5d0b2fe45",
          html_url:
            "https://github.com/nbibler/bundle-gem-output/commit/395fb94763fd8096cf6aa72b11d933e5d0b2fe45",
          comments_url:
            "https://api.github.com/repos/nbibler/bundle-gem-output/commits/395fb94763fd8096cf6aa72b11d933e5d0b2fe45/comments",
          author: {
            login: "nbibler",
            id: 3775,
            node_id: "MDQ6VXNlcjM3NzU=",
            avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/nbibler",
            html_url: "https://github.com/nbibler",
            followers_url: "https://api.github.com/users/nbibler/followers",
            following_url:
              "https://api.github.com/users/nbibler/following{/other_user}",
            gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/nbibler/subscriptions",
            organizations_url: "https://api.github.com/users/nbibler/orgs",
            repos_url: "https://api.github.com/users/nbibler/repos",
            events_url: "https://api.github.com/users/nbibler/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/nbibler/received_events",
            type: "User",
            site_admin: false,
          },
          committer: {
            login: "nbibler",
            id: 3775,
            node_id: "MDQ6VXNlcjM3NzU=",
            avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/nbibler",
            html_url: "https://github.com/nbibler",
            followers_url: "https://api.github.com/users/nbibler/followers",
            following_url:
              "https://api.github.com/users/nbibler/following{/other_user}",
            gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/nbibler/subscriptions",
            organizations_url: "https://api.github.com/users/nbibler/orgs",
            repos_url: "https://api.github.com/users/nbibler/repos",
            events_url: "https://api.github.com/users/nbibler/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/nbibler/received_events",
            type: "User",
            site_admin: false,
          },
          parents: [
            {
              sha: "8ab9767cd4154f6d42355fc8fe7db5046eaa7fff",
              url:
                "https://api.github.com/repos/nbibler/bundle-gem-output/commits/8ab9767cd4154f6d42355fc8fe7db5046eaa7fff",
              html_url:
                "https://github.com/nbibler/bundle-gem-output/commit/8ab9767cd4154f6d42355fc8fe7db5046eaa7fff",
            },
          ],
        },
        status: "ahead",
        ahead_by: 4,
        behind_by: 0,
        total_commits: 4,
        commits: [
          {
            sha: "06f0a324391213b2161efd75fdf346beead88fc4",
            node_id:
              "MDY6Q29tbWl0OTIxMTY1ODg6MDZmMGEzMjQzOTEyMTNiMjE2MWVmZDc1ZmRmMzQ2YmVlYWQ4OGZjNA==",
            commit: {
              author: {
                name: "Nathaniel Bibler",
                email: "git@nathanielbibler.com",
                date: "2019-12-18T01:21:47Z",
              },
              committer: {
                name: "Nathaniel Bibler",
                email: "git@nathanielbibler.com",
                date: "2019-12-18T01:21:47Z",
              },
              message:
                '2.1.1\n\nGenerated from: "bundle gem my-gem --coc --mit --test=rspec"',
              tree: {
                sha: "2fe9ba8384ae4faf13983d50502aa509ff636d8c",
                url:
                  "https://api.github.com/repos/nbibler/bundle-gem-output/git/trees/2fe9ba8384ae4faf13983d50502aa509ff636d8c",
              },
              url:
                "https://api.github.com/repos/nbibler/bundle-gem-output/git/commits/06f0a324391213b2161efd75fdf346beead88fc4",
              comment_count: 0,
              verification: {
                verified: false,
                reason: "unsigned",
                signature: null,
                payload: null,
              },
            },
            url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/commits/06f0a324391213b2161efd75fdf346beead88fc4",
            html_url:
              "https://github.com/nbibler/bundle-gem-output/commit/06f0a324391213b2161efd75fdf346beead88fc4",
            comments_url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/commits/06f0a324391213b2161efd75fdf346beead88fc4/comments",
            author: {
              login: "nbibler",
              id: 3775,
              node_id: "MDQ6VXNlcjM3NzU=",
              avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/nbibler",
              html_url: "https://github.com/nbibler",
              followers_url: "https://api.github.com/users/nbibler/followers",
              following_url:
                "https://api.github.com/users/nbibler/following{/other_user}",
              gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/nbibler/subscriptions",
              organizations_url: "https://api.github.com/users/nbibler/orgs",
              repos_url: "https://api.github.com/users/nbibler/repos",
              events_url:
                "https://api.github.com/users/nbibler/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/nbibler/received_events",
              type: "User",
              site_admin: false,
            },
            committer: {
              login: "nbibler",
              id: 3775,
              node_id: "MDQ6VXNlcjM3NzU=",
              avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/nbibler",
              html_url: "https://github.com/nbibler",
              followers_url: "https://api.github.com/users/nbibler/followers",
              following_url:
                "https://api.github.com/users/nbibler/following{/other_user}",
              gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/nbibler/subscriptions",
              organizations_url: "https://api.github.com/users/nbibler/orgs",
              repos_url: "https://api.github.com/users/nbibler/repos",
              events_url:
                "https://api.github.com/users/nbibler/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/nbibler/received_events",
              type: "User",
              site_admin: false,
            },
            parents: [
              {
                sha: "395fb94763fd8096cf6aa72b11d933e5d0b2fe45",
                url:
                  "https://api.github.com/repos/nbibler/bundle-gem-output/commits/395fb94763fd8096cf6aa72b11d933e5d0b2fe45",
                html_url:
                  "https://github.com/nbibler/bundle-gem-output/commit/395fb94763fd8096cf6aa72b11d933e5d0b2fe45",
              },
            ],
          },
          {
            sha: "57eee58e1c469a8c455ae33ee19cf21314b545d5",
            node_id:
              "MDY6Q29tbWl0OTIxMTY1ODg6NTdlZWU1OGUxYzQ2OWE4YzQ1NWFlMzNlZTE5Y2YyMTMxNGI1NDVkNQ==",
            commit: {
              author: {
                name: "Nathaniel Bibler",
                email: "git@nathanielbibler.com",
                date: "2019-12-20T04:59:18Z",
              },
              committer: {
                name: "Nathaniel Bibler",
                email: "git@nathanielbibler.com",
                date: "2019-12-20T04:59:18Z",
              },
              message:
                '2.1.2\n\nGenerated from: "bundle gem my-gem --coc --mit --test=rspec"',
              tree: {
                sha: "b61560c3d3484eaec9cdbee7186d3bdd71986634",
                url:
                  "https://api.github.com/repos/nbibler/bundle-gem-output/git/trees/b61560c3d3484eaec9cdbee7186d3bdd71986634",
              },
              url:
                "https://api.github.com/repos/nbibler/bundle-gem-output/git/commits/57eee58e1c469a8c455ae33ee19cf21314b545d5",
              comment_count: 0,
              verification: {
                verified: false,
                reason: "unsigned",
                signature: null,
                payload: null,
              },
            },
            url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/commits/57eee58e1c469a8c455ae33ee19cf21314b545d5",
            html_url:
              "https://github.com/nbibler/bundle-gem-output/commit/57eee58e1c469a8c455ae33ee19cf21314b545d5",
            comments_url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/commits/57eee58e1c469a8c455ae33ee19cf21314b545d5/comments",
            author: {
              login: "nbibler",
              id: 3775,
              node_id: "MDQ6VXNlcjM3NzU=",
              avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/nbibler",
              html_url: "https://github.com/nbibler",
              followers_url: "https://api.github.com/users/nbibler/followers",
              following_url:
                "https://api.github.com/users/nbibler/following{/other_user}",
              gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/nbibler/subscriptions",
              organizations_url: "https://api.github.com/users/nbibler/orgs",
              repos_url: "https://api.github.com/users/nbibler/repos",
              events_url:
                "https://api.github.com/users/nbibler/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/nbibler/received_events",
              type: "User",
              site_admin: false,
            },
            committer: {
              login: "nbibler",
              id: 3775,
              node_id: "MDQ6VXNlcjM3NzU=",
              avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/nbibler",
              html_url: "https://github.com/nbibler",
              followers_url: "https://api.github.com/users/nbibler/followers",
              following_url:
                "https://api.github.com/users/nbibler/following{/other_user}",
              gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/nbibler/subscriptions",
              organizations_url: "https://api.github.com/users/nbibler/orgs",
              repos_url: "https://api.github.com/users/nbibler/repos",
              events_url:
                "https://api.github.com/users/nbibler/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/nbibler/received_events",
              type: "User",
              site_admin: false,
            },
            parents: [
              {
                sha: "06f0a324391213b2161efd75fdf346beead88fc4",
                url:
                  "https://api.github.com/repos/nbibler/bundle-gem-output/commits/06f0a324391213b2161efd75fdf346beead88fc4",
                html_url:
                  "https://github.com/nbibler/bundle-gem-output/commit/06f0a324391213b2161efd75fdf346beead88fc4",
              },
            ],
          },
          {
            sha: "d0a02022620c091473d087c5f3dd72d6d11b79af",
            node_id:
              "MDY6Q29tbWl0OTIxMTY1ODg6ZDBhMDIwMjI2MjBjMDkxNDczZDA4N2M1ZjNkZDcyZDZkMTFiNzlhZg==",
            commit: {
              author: {
                name: "Nathaniel Bibler",
                email: "git@nathanielbibler.com",
                date: "2020-01-02T15:03:23Z",
              },
              committer: {
                name: "Nathaniel Bibler",
                email: "git@nathanielbibler.com",
                date: "2020-01-02T15:03:23Z",
              },
              message:
                '2.1.3\n\nGenerated from: "bundle gem my-gem --coc --mit --test=rspec"',
              tree: {
                sha: "5ccc571a5a5e1f57ed6d8c5e831fa2e2ce54cb2e",
                url:
                  "https://api.github.com/repos/nbibler/bundle-gem-output/git/trees/5ccc571a5a5e1f57ed6d8c5e831fa2e2ce54cb2e",
              },
              url:
                "https://api.github.com/repos/nbibler/bundle-gem-output/git/commits/d0a02022620c091473d087c5f3dd72d6d11b79af",
              comment_count: 0,
              verification: {
                verified: false,
                reason: "unsigned",
                signature: null,
                payload: null,
              },
            },
            url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/commits/d0a02022620c091473d087c5f3dd72d6d11b79af",
            html_url:
              "https://github.com/nbibler/bundle-gem-output/commit/d0a02022620c091473d087c5f3dd72d6d11b79af",
            comments_url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/commits/d0a02022620c091473d087c5f3dd72d6d11b79af/comments",
            author: {
              login: "nbibler",
              id: 3775,
              node_id: "MDQ6VXNlcjM3NzU=",
              avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/nbibler",
              html_url: "https://github.com/nbibler",
              followers_url: "https://api.github.com/users/nbibler/followers",
              following_url:
                "https://api.github.com/users/nbibler/following{/other_user}",
              gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/nbibler/subscriptions",
              organizations_url: "https://api.github.com/users/nbibler/orgs",
              repos_url: "https://api.github.com/users/nbibler/repos",
              events_url:
                "https://api.github.com/users/nbibler/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/nbibler/received_events",
              type: "User",
              site_admin: false,
            },
            committer: {
              login: "nbibler",
              id: 3775,
              node_id: "MDQ6VXNlcjM3NzU=",
              avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/nbibler",
              html_url: "https://github.com/nbibler",
              followers_url: "https://api.github.com/users/nbibler/followers",
              following_url:
                "https://api.github.com/users/nbibler/following{/other_user}",
              gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/nbibler/subscriptions",
              organizations_url: "https://api.github.com/users/nbibler/orgs",
              repos_url: "https://api.github.com/users/nbibler/repos",
              events_url:
                "https://api.github.com/users/nbibler/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/nbibler/received_events",
              type: "User",
              site_admin: false,
            },
            parents: [
              {
                sha: "57eee58e1c469a8c455ae33ee19cf21314b545d5",
                url:
                  "https://api.github.com/repos/nbibler/bundle-gem-output/commits/57eee58e1c469a8c455ae33ee19cf21314b545d5",
                html_url:
                  "https://github.com/nbibler/bundle-gem-output/commit/57eee58e1c469a8c455ae33ee19cf21314b545d5",
              },
            ],
          },
          {
            sha: "ed58399a3252d50844fe44c5f1a694f3c692d1e8",
            node_id:
              "MDY6Q29tbWl0OTIxMTY1ODg6ZWQ1ODM5OWEzMjUyZDUwODQ0ZmU0NGM1ZjFhNjk0ZjNjNjkyZDFlOA==",
            commit: {
              author: {
                name: "Nathaniel Bibler",
                email: "git@nathanielbibler.com",
                date: "2020-01-06T15:40:14Z",
              },
              committer: {
                name: "Nathaniel Bibler",
                email: "git@nathanielbibler.com",
                date: "2020-01-06T15:40:14Z",
              },
              message:
                '2.1.4\n\nGenerated from: "bundle gem my-gem --coc --mit --test=rspec"',
              tree: {
                sha: "e3d17e99c503cd3f2ae3d1292da000e84d1e62f8",
                url:
                  "https://api.github.com/repos/nbibler/bundle-gem-output/git/trees/e3d17e99c503cd3f2ae3d1292da000e84d1e62f8",
              },
              url:
                "https://api.github.com/repos/nbibler/bundle-gem-output/git/commits/ed58399a3252d50844fe44c5f1a694f3c692d1e8",
              comment_count: 0,
              verification: {
                verified: false,
                reason: "unsigned",
                signature: null,
                payload: null,
              },
            },
            url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/commits/ed58399a3252d50844fe44c5f1a694f3c692d1e8",
            html_url:
              "https://github.com/nbibler/bundle-gem-output/commit/ed58399a3252d50844fe44c5f1a694f3c692d1e8",
            comments_url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/commits/ed58399a3252d50844fe44c5f1a694f3c692d1e8/comments",
            author: {
              login: "nbibler",
              id: 3775,
              node_id: "MDQ6VXNlcjM3NzU=",
              avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/nbibler",
              html_url: "https://github.com/nbibler",
              followers_url: "https://api.github.com/users/nbibler/followers",
              following_url:
                "https://api.github.com/users/nbibler/following{/other_user}",
              gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/nbibler/subscriptions",
              organizations_url: "https://api.github.com/users/nbibler/orgs",
              repos_url: "https://api.github.com/users/nbibler/repos",
              events_url:
                "https://api.github.com/users/nbibler/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/nbibler/received_events",
              type: "User",
              site_admin: false,
            },
            committer: {
              login: "nbibler",
              id: 3775,
              node_id: "MDQ6VXNlcjM3NzU=",
              avatar_url: "https://avatars0.githubusercontent.com/u/3775?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/nbibler",
              html_url: "https://github.com/nbibler",
              followers_url: "https://api.github.com/users/nbibler/followers",
              following_url:
                "https://api.github.com/users/nbibler/following{/other_user}",
              gists_url: "https://api.github.com/users/nbibler/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/nbibler/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/nbibler/subscriptions",
              organizations_url: "https://api.github.com/users/nbibler/orgs",
              repos_url: "https://api.github.com/users/nbibler/repos",
              events_url:
                "https://api.github.com/users/nbibler/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/nbibler/received_events",
              type: "User",
              site_admin: false,
            },
            parents: [
              {
                sha: "d0a02022620c091473d087c5f3dd72d6d11b79af",
                url:
                  "https://api.github.com/repos/nbibler/bundle-gem-output/commits/d0a02022620c091473d087c5f3dd72d6d11b79af",
                html_url:
                  "https://github.com/nbibler/bundle-gem-output/commit/d0a02022620c091473d087c5f3dd72d6d11b79af",
              },
            ],
          },
        ],
        files: [
          {
            sha: "910bf38a315f5ac2df59621b9a61c9965ebc635c",
            filename: ".travis.yml",
            status: "modified",
            additions: 2,
            deletions: 2,
            changes: 4,
            blob_url:
              "https://github.com/nbibler/bundle-gem-output/blob/ed58399a3252d50844fe44c5f1a694f3c692d1e8/.travis.yml",
            raw_url:
              "https://github.com/nbibler/bundle-gem-output/raw/ed58399a3252d50844fe44c5f1a694f3c692d1e8/.travis.yml",
            contents_url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/contents/.travis.yml?ref=ed58399a3252d50844fe44c5f1a694f3c692d1e8",
            patch:
              "@@ -2,5 +2,5 @@\n language: ruby\n cache: bundler\n rvm:\n-  - 2.6.5\n-before_install: gem install bundler -v 2.1.0\n+  - 2.7.0\n+before_install: gem install bundler -v 2.1.4",
          },
          {
            sha: "945fe237c65d1470cb4b0dbcddf19fbb8a4a4e6e",
            filename: "LICENSE.txt",
            status: "modified",
            additions: 1,
            deletions: 1,
            changes: 2,
            blob_url:
              "https://github.com/nbibler/bundle-gem-output/blob/ed58399a3252d50844fe44c5f1a694f3c692d1e8/LICENSE.txt",
            raw_url:
              "https://github.com/nbibler/bundle-gem-output/raw/ed58399a3252d50844fe44c5f1a694f3c692d1e8/LICENSE.txt",
            contents_url:
              "https://api.github.com/repos/nbibler/bundle-gem-output/contents/LICENSE.txt?ref=ed58399a3252d50844fe44c5f1a694f3c692d1e8",
            patch:
              '@@ -1,6 +1,6 @@\n The MIT License (MIT)\n \n-Copyright (c) 2019 Author Name\n+Copyright (c) 2020 Author Name\n \n Permission is hereby granted, free of charge, to any person obtaining a copy\n of this software and associated documentation files (the "Software"), to deal',
          },
        ],
      };

      return new Response(
        200,
        { "Content-Type": "application/json; charset=utf-8" },
        diff
      );
    }
  );
}
