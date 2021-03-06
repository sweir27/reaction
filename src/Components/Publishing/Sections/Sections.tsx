import { clone, compact, findLastIndex, once } from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { ArticleData } from "../Typings"
import { Authors } from "./Authors"
import { Embed } from "./Embed"
import { ImageCollection } from "./ImageCollection"
import { ImageSetPreview } from "./ImageSetPreview"
import { SectionContainer } from "./SectionContainer"
import { Text } from "./Text"
import { Video } from "./Video"

interface Props {
  DisplayPanel?: any
  article: ArticleData
  isMobile?: boolean
}

interface State {
  shouldInjectMobileDisplay: boolean
}

/**
 * When isMobile, hide sidebar and inject DisplayAd into the body of the
 * article at a specific paragraph index.
 */
const MOBILE_DISPLAY_INJECT_INDEX = 1
const MOBILE_DISPLAY_INJECT_ID_PREFIX = "__mobile_display_inject__"

export class Sections extends Component<Props, State> {
  static defaultProps = {
    isMobile: false,
  }

  displayInjectId: string

  state = {
    shouldInjectMobileDisplay: false,
  }

  componentWillMount() {
    const { article: { layout }, isMobile } = this.props

    this.injectDisplayPanelMarker = once(this.injectDisplayPanelMarker)
    const shouldInjectMobileDisplay = isMobile && layout !== "feature"

    this.setState({
      shouldInjectMobileDisplay,
    })
  }

  componentDidMount() {
    if (this.state.shouldInjectMobileDisplay) {
      this.mountDisplayToMarker()
    }
  }

  componentDidUpdate(prevProps) {
    const { isMobile } = this.props

    if (prevProps.isMobile !== isMobile) {
      this.setState(
        {
          shouldInjectMobileDisplay: isMobile,
        },
        () => {
          if (isMobile && this.state.shouldInjectMobileDisplay) {
            this.mountDisplayToMarker()
          }
        }
      )
    }
  }

  /**
   * Inject DisplayAd after a specific paragraph index
   */
  injectDisplayPanelMarker(body) {
    const articleId = this.props.article.id
    const tag = "</p>"
    const updatedBody = compact(body.split(tag))
      .map(p => p + tag)
      .reduce((arr, block, paragraphIndex) => {
        if (paragraphIndex === MOBILE_DISPLAY_INJECT_INDEX) {
          this.displayInjectId = `${MOBILE_DISPLAY_INJECT_ID_PREFIX}${articleId}`
          return arr.concat([block, `<div id="${this.displayInjectId}"></div>`])
        } else {
          return arr.concat([block])
        }
      }, [])
      .join("")

    return updatedBody
  }

  mountDisplayToMarker() {
    const { DisplayPanel } = this.props
    const displayMountPoint = document.getElementById(this.displayInjectId)

    if (displayMountPoint) {
      ReactDOM.render(<DisplayPanel />, displayMountPoint)
    } else {
      console.error(
        "(reaction/Sections.tsx) Error mounting Display: DOM node ",
        "not found",
        displayMountPoint
      )
    }
  }

  getContentStartIndex = () => {
    const { article: { layout, sections } } = this.props

    if (layout === "feature") {
      const firstText = sections.findIndex(section => {
        return section.type === "text"
      })
      return firstText
    }
  }

  getContentEndIndex = () => {
    const { article: { layout, sections } } = this.props

    if (["feature", "standard"].includes(layout)) {
      const lastText = findLastIndex(sections, section => {
        return section.type === "text"
      })
      return lastText
    }
  }

  getSection(section, index) {
    const { article } = this.props

    const sections = {
      image_collection: (
        <ImageCollection
          sectionLayout={section.layout}
          articleLayout={article.layout}
          images={section.images}
          targetHeight={500}
          gutter={10}
        />
      ),
      image_set: <ImageSetPreview section={section} />,
      video: <Video section={section} />,
      embed: <Embed section={section} />,
      text: (
        <Text
          html={section.body}
          layout={article.layout}
          isContentStart={index === this.getContentStartIndex()}
          isContentEnd={index === this.getContentEndIndex()}
        />
      ),
      default: false,
    }

    const sectionComponent = sections[section.type] || sections.default
    return sectionComponent
  }

  renderSections() {
    const { article } = this.props
    const { shouldInjectMobileDisplay } = this.state
    let displayMarkerInjected = false

    const renderedSections = article.sections.map((sectionItem, index) => {
      const shouldInject =
        shouldInjectMobileDisplay &&
        sectionItem.type === "text" &&
        !displayMarkerInjected

      let section = sectionItem

      if (shouldInject) {
        try {
          section = clone(sectionItem)
          section.body = this.injectDisplayPanelMarker(section.body)
          displayMarkerInjected = true
        } catch (error) {
          console.error(
            "(reaction/Sections.jsx) Error injecting Display:",
            error
          )
        }
      }

      const child = this.getSection(section, index)

      if (child) {
        return (
          <SectionContainer
            key={index}
            layout={section.layout}
            articleLayout={article.layout}
            type={section.type}
          >
            {child}
          </SectionContainer>
        )
      }
    })

    return renderedSections
  }

  renderAuthors() {
    const { article: { authors } } = this.props

    if (authors) {
      return (
        <SectionContainer type="author">
          <Authors authors={authors} />
        </SectionContainer>
      )
    }
  }

  renderPostScript() {
    const { article } = this.props
    const { layout, postscript } = article

    if (postscript) {
      return (
        <SectionContainer type="text">
          <Text
            html={postscript}
            layout={layout}
            postscript={Boolean(postscript)}
          />
        </SectionContainer>
      )
    }
  }

  render() {
    const { article } = this.props

    return (
      <StyledSections layout={article.layout}>
        {this.renderSections()}
        {this.renderAuthors()}
        {this.renderPostScript()}
      </StyledSections>
    )
  }
}

const chooseMargin = layout => {
  if (layout === "standard") {
    return "0;"
  } else if (layout === "feature") {
    return "80px auto 0 auto;"
  }
}

const div: StyledFunction<{ layout: string }> = styled.div
const StyledSections = div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: ${props => chooseMargin(props.layout)}
  max-width: ${props => (props.layout === "standard" ? "780px" : "auto")};

  ${props => pMedia.xl`
    max-width: ${props.layout === "standard" ? "680px" : "auto"};
    ${props.layout === "feature" ? "margin: 80px auto 0 auto" : ""}
  `}

  ${props => pMedia.md`
    max-width: ${props.layout === "standard" ? "780px" : "auto"};
  `}
  ${props => pMedia.xs`
    max-width: ${props.layout === "standard" ? "780px" : "auto"};
    ${props.layout === "feature" ? "margin: 30px auto 0 auto" : ""}
  `}
`
