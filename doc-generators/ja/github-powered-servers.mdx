---
title: 'GitHub連携MCPドキュメントサーバー'
description: 'GitHubリポジトリをMCPドキュメントサーバーに変換するツール'
icon: "github"
iconType: "brands"
---

import { GitHubPackageCards } from '/snippets/GitHubPackageCards.mdx'

場合によっては、ドキュメントを自分で*作成*するのではなく、**GitHubにあるオープンソースライブラリの最新の完全なドキュメント**をAIアシスタントが利用できるようにしたいことがあります。以下のコミュニティプロジェクトは、**_どんな_リポジトリでもリモートMCPサーバーに変換**し、オンデマンドでドキュメントをストリーミングできるようにします。

<Callout type="warning">
  <Icon icon="clock" iconType="solid" /> **初回処理時間** – リポジトリがContext7またはGitMCPによって以前にインデックス化されていない場合、システムが自動インデックス化とRAG準備を実行するため、初期処理が完了するまでに時間（通常数分）がかかることがあります。
</Callout>

## <Icon icon="toolbox" iconType="solid" /> 利用可能なサービス

<GitHubPackageCards
  packages={[
    {
      owner: "upstash",
      repo: "context7",
      title: "Context7"
    },
    {
      owner: "idosal",
      repo: "git-mcp",
      title: "GitMCP.io"
    }
  ]
  }
/>

---

### <Icon icon="rocket" iconType="solid" /> Context7

![Context7](https://context7.com/opengraph-image.png?fcbbae99526c7ed1)
**Context7**は**人気のあるオープンソースライブラリ**（および多くの**プライベートなもの**も）を自動的に取り込み、**リモートMCPサーバー**として公開します。

<Callout type="info">
  <Icon icon="bolt" iconType="solid" /> **クイックセットアップ** – 以下の設定を使用して、お好みの環境でContext7の利用を開始できます。
</Callout>

<Tabs items={['Cursor', 'Windsurf', 'VSCode', 'Claude Desktop']}>
  <Tab title="Cursor">
    `~/.cursor/mcp.json`にMCPサーバーを追加します：

    ```json
    {
      "mcpServers": {
        "context7": {
          "command": "npx",
          "args": ["-y", "@upstash/context7-mcp@latest"]
        }
      }
    }
    ```
  </Tab>
  <Tab title="Windsurf">
    WindsurfのMCP設定ファイルに以下を追加します：

    ```json
    {
      "mcpServers": {
        "context7": {
          "command": "npx",
          "args": ["-y", "@upstash/context7-mcp@latest"]
        }
      }
    }
    ```
  </Tab>
  <Tab title="Cline">
    ClineのMCP設定ファイルに以下を追加します：

    ```json
    {
        "mcpServers": {
            "context7": {
                "command": "npx",
                "args": ["-y", "@upstash/context7-mcp@latest"],
                "disabled": false,
                "autoApprove": []
            }
        }
    }
    ```
  </Tab>
  <Tab title="VSCode">
    VSCodeのMCP設定ファイルに以下を追加します：

    ```json
    {
        "servers": {
            "Context7": {
                "type": "stdio",
                "command": "npx",
                "args": ["-y", "@upstash/context7-mcp@latest"]
            }
        }
    }
    ```
  </Tab>
</Tabs>

#### <Icon icon="lightbulb" iconType="solid" /> 例：Context7をThree.jsと共に使用

Context7をインストールした後、以下のようにAIアシスタントにThree.jsのドキュメントを使用するよう指示できます：

```
回転するキューブを含む基本的なThree.jsシーンの作成を手伝ってください。
Context7を使用してください。
```

AIは回答を提供する際に、**Context7に対して動的にThree.jsのドキュメントを照会**します。

### <Icon icon="code-branch" iconType="solid" /> GitMCP.io

![GitMCP](https://gitmcp.io/img/OG.png)

[**GitMCP**](https://gitmcp.io)を使用すると、ドメインを`github.com`→`gitmcp.io`（または`github.io`→`gitmcp.io`）に変更するだけで、**どんな公開GitHubリポジトリでも**完全な機能を備えたMCPサーバーに変換できます。**ビルドステップやパッケージインストールは不要**です。

<Callout type="tip">
  <Icon icon="wand-magic-sparkles" iconType="solid" /> **プロティップ** – GitHubのURLをGitMCPのURLに変更するだけで、ドキュメントに即座にアクセスできます！
</Callout>

<Tabs items={['Cursor', 'Windsurf', 'VSCode', 'Claude Desktop']}>
  <Tab title="Cursor">
    ```json
    {
      "mcpServers": {
        "threejs": {
          "url": "https://gitmcp.io/mrdoob/three.js"
        }
      }
    }
    ```
  </Tab>
  <Tab title="Windsurf">
    ```json
    {
      "mcpServers": {
        "threejs": {
          "serverUrl": "https://gitmcp.io/mrdoob/three.js"
        }
      }
    }
    ```
  </Tab>
  <Tab title="Cline">
  ```json
    {
        "mcpServers": {
            "threejs": {
                "url": "https://gitmcp.io/mrdoob/three.js",
                "disabled": false,
                "autoApprove": []
            }
        }
    }
}
    ```
 </Tab>

  <Tab title="VSCode">
    ```json
    {
      "servers": {
        "threejs": {
          "type": "sse",
          "url": "https://gitmcp.io/mrdoob/three.js"
        }
      }
    }
    ```
  </Tab>
</Tabs>

## <Icon icon="vial" iconType="solid" /> 例：Three.jsドキュメント

どちらのMCPサーバーを設定した後も、以下の**ワンショットプロンプト**をCursor + Claudeで使用すると、改善が示されます：

> キーボードコントロール（WASD）による移動が可能な、質感のある動的な都市環境を移動できる、リアルなキャラクターが登場するThree.jsシーンを構築してください。また、リアルな照明と微妙なブルーム効果も実装してください。

### <Icon icon="code-compare" iconType="solid" /> 並べて比較した結果（GitMCP vs. GitMCPなし）

<video
  autoPlay
  muted
  loop
  playsInline
  className="w-full aspect-video"
  src="gitmcp-threejs.mp4"
  title="GitMCP vs No GitMCP – Three.js demo"
  width="550"
  height="206"
></video>

<Callout type="info">
  <Icon icon="info-circle" iconType="solid" /> **なぜ重要か** – GitMCPは完全なThree.jsドキュメントをオンデマンドでストリーミングすることで、LLMに正確なAPI詳細（例：`GLTFLoader`、`DirectionalLight.castShadow`、`EffectComposer`など）を提供します。これらの情報は通常、利用できないか古い情報となっているため、大幅に高品質なコード生成が可能になります。
</Callout>

## <Icon icon="star" iconType="solid" /> GitHub連携MCPサーバーの利点

これらのツールはいくつかの利点を提供します：

- <Icon icon="check" iconType="solid" /> **ドキュメント作成の手間なし**：GitHubリポジトリの既存のドキュメントをそのまま利用
- <Icon icon="newspaper" iconType="solid" /> **常に最新**：ドキュメントは最新のリポジトリバージョンから直接取得
- <Icon icon="bolt" iconType="solid" /> **オンデマンドアクセス**：AIアシスタントは必要なときに必要な情報のみを照会
- <Icon icon="puzzle-piece" iconType="solid" /> **幅広い互換性**：GitHub上の事実上すべてのオープンソースプロジェクトで動作
- <Icon icon="code" iconType="solid" /> **簡単な統合**：IDEやAIアシスタントに簡単に追加可能 