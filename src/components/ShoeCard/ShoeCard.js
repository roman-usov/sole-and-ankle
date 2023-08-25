import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const INFOTAGS = {
  onSale: {
    textContent: "Sale",
    backgroundColor: `${COLORS.primary}`,
  },
  newRelease: {
    textContent: "Just Released!",
    backgroundColor: `${COLORS.secondary}`,
  },
};

const PRICES = {
  onSale: {
    regularPriceColor: `${COLORS.gray[700]}`,
    regularPriceTextDecoration: "line-through",
    salePriceColor: `${COLORS.primary}`,
    salePriceTextDecoration: "none",
  },
  regular: {
    regularPriceColor: `${COLORS.gray[900]}`,
    regularPriceTextDecoration: "none",
    salePriceColor: null,
    salePriceTextDecoration: null,
  },
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore

  // eslint-disable-next-line
  const variant = typeof salePrice === 'number'
    ? 'onSale'
    : isNewShoe(releaseDate)
      ? 'newRelease'
      : null

  const infoTagData = variant && INFOTAGS[variant];

  const {
    regularPriceColor,
    regularPriceTextDecoration,
    salePriceColor,
    salePriceTextDecoration,
  } = variant === "onSale" ? PRICES.onSale : PRICES.regular;

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--color": regularPriceColor,
              "--text-decoration": regularPriceTextDecoration,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "onSale" && (
            <Price
              style={{
                "--color": salePriceColor,
                "--text-decoration": salePriceTextDecoration,
              }}
            >
              {formatPrice(salePrice)}
            </Price>
          )}
        </Row>
      </Wrapper>
      {variant && (
        <InfoTag style={{ "--backgroundColor": infoTagData.backgroundColor }}>
          {infoTagData.textContent}
        </InfoTag>
      )}
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 344px;
  margin-bottom: 30px;
  position: relative;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: clip;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const InfoTag = styled.span`
  background-color: var(--backgroundColor);
  font-family: inherit;
  font-size: 0.875rem;
  color: ${COLORS.white};
  font-weight: 700;
  padding: 0.4375rem 0.5625rem 0.5625rem 0.6875rem;
  position: absolute;
  top: 12px;
  right: -4px;
  border-radius: 2px;
`;

export default ShoeCard;
