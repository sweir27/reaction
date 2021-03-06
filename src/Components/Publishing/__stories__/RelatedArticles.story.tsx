import { storiesOf } from "@storybook/react"
import React from "react"
import { RelatedCanvas, RelatedPanel } from "../Fixtures/Components"
import { RelatedArticlesCanvas } from "../RelatedArticles/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "../RelatedArticles/RelatedArticlesPanel"

storiesOf("Publishing/Related Articles", module)
  .add("Related Articles Panel", () => {
    return <RelatedArticlesPanel articles={RelatedPanel} />
  })
  .add("Related Articles Canvas - with vertical", () => {
    return (
      <RelatedArticlesCanvas
        articles={RelatedCanvas}
        vertical={{
          name: "Market Analysis",
          id: "123",
        }}
      />
    )
  })
  .add("Related Articles Canvas - without vertical", () => {
    return <RelatedArticlesCanvas articles={RelatedCanvas} />
  })
