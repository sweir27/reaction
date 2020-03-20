import { Box, Flex, Sans, Spacer } from "@artsy/palette"
import React from "react"

import { Consign_artworksByInternalID } from "__generated__/Consign_artworksByInternalID.graphql"

import FillwidthItem from "Components/Artwork/FillwidthItem"
import { ArtistConsignment } from "../Utils/getConsignmentData"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"

interface ArtistConsignRecentlySoldProps {
  artistConsignment: ArtistConsignment
  artistName: string
  artworksByInternalID: Consign_artworksByInternalID
}

export const ArtistConsignRecentlySold: React.FC<ArtistConsignRecentlySoldProps> = ({
  artistConsignment,
  artistName,
  artworksByInternalID,
}) => {
  return (
    <SectionContainer>
      <Box textAlign="center">
        <Box>
          <Subheader>Recently sold {artistName} works on Artsy</Subheader>

          <Spacer my={1} />

          <Box>
            <Sans size="6">
              Works by {artistName} sold on Artsy in the past 12 months
            </Sans>
          </Box>

          <Spacer my={4} />

          <Flex
            justifyContent={["center", "center"]}
            flexWrap="wrap"
            alignItems="center"
          >
            {artworksByInternalID.map((artwork, key) => {
              return (
                <Box p={2} key={key}>
                  <FillwidthItem
                    artwork={artwork}
                    targetHeight={150}
                    imageHeight={150}
                    showExtended={false}
                    width={150 * artwork.image.aspectRatio}
                  />
                </Box>
              )
            })}
          </Flex>
        </Box>
      </Box>
    </SectionContainer>
  )
}
