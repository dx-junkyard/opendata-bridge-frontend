# Opendata Bridge Frontend

Opendata bridge のフロントエンド機能を提供するシステム

## Run with Docker

```bash
$ docker build -t opendata-bridge-frontend .

$ docker run -it --env-file=.env.production.local --rm --name opendata-bridge-frontend -p 3000:3000 opendata-bridge-frontend
```

## 開発に参加するためには？

Opendata Bridge Frontend の開発に興味を持っていただき、ありがとうございます。
より良いアプリケーションの実現のため、機能改善やバグ修正の参加を募集しています。

皆さんが開発に参加するために、一連の開発の流れの例を記載します。

### 事前知識

本プロジェクトは、GitHub flow に基づいて開発を行います。
[GitHub flow - GitHub Docs](https://docs.github.com/en/get-started/using-github/github-flow)

原則、main ブランチに向けて Pull Request を作成してください。
main ブランチにマージされたコードは、リリースのタイミングで main ブランチにマージされます。

main ブランチにマージされたコードは、CODEOWNERS によってリリースパッケージが作成された後に、本番環境にデプロイされます。

### 開発の流れ

#### 1. issue の作成

機能改善の要望やバグの報告があれば、まずは報告をお願いします。

#### 2. リポジトリのフォーク

GitHub のリポジトリページで本プロジェクトをフォークしてください。

#### 3. プロダクトコードの修正

作成した issue に関して、プロダクトコードに変更を加えましょう。

#### 4. 変更したコードの push

変更したコードを push しましょう。
ブランチ名は「feature/issue-{IssueID}」のような命名規則としてください。

#### 5. PR の作成

main ブランチに向けて PR を作成しましょう。CODEOWNERS のメンバーがレビューします。

#### 6. プルリクエストのレビュー

プルリクエストがレビューされ、問題がなければ本プロジェクトにマージされます。
CODEOWNERS から修正の指摘があった場合は、それに応じて変更を加えてください。

## サードパーティライブラリのクレジット

このプロジェクトには以下のライブラリが含まれています：

1. @fortawesome/free-regular-svg-icons by Fonticons, Inc.

- ライセンス: CC-BY-4.0 AND MIT
- https://github.com/FortAwesome/Font-Awesome
- CC-BY-4.0ライセンスの詳細: https://creativecommons.org/licenses/by/4.0/

2. @fortawesome/free-solid-svg-icons by Fonticons, Inc.

- ライセンス: CC-BY-4.0 AND MIT
- https://github.com/FortAwesome/Font-Awesome
- CC-BY-4.0ライセンスの詳細: https://creativecommons.org/licenses/by/4.0/

3. dotenv by Scott Motte

- ライセンス: BSD-2-Clause
- 著作権 Scott Motte 2015
- このソフトウェアは、上記の著作権表示および条件リストを含めることを条件に、再配布および使用が許可されます。
- BSD-2-Clauseライセンスの詳細: https://opensource.org/license/bsd-2-clause/
