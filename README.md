# Opendata Bridge Frontend

Opendata bridge のフロントエンド機能を提供するシステム

## Run with Docker

```bash
$ docker build -t opendata-bridge-frontend .

$ docker run -it --env-file=.env.production.local --rm --name opendata-bridge-frontend -p 3000:3000 opendata-bridge-frontend
```


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
   - 著作権 Scott Motte  2015
   - このソフトウェアは、上記の著作権表示および条件リストを含めることを条件に、再配布および使用が許可されます。
   - BSD-2-Clauseライセンスの詳細: https://opensource.org/license/bsd-2-clause/

