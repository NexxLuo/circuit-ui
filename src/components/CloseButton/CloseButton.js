import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { svgKilo } from '../../styles/style-helpers';
import SvgButton from '../SvgButton';
import { ReactComponent as Icon } from './close-icon.svg';

const SvgCloseButton = styled(SvgButton)(
  ({ theme }) => css`
    label: close-button;
    ${svgKilo({ theme })};
  `
);

/**
 * A generic close button.
 */
const CloseButton = props => (
  <SvgCloseButton {...props}>
    <Icon />
  </SvgCloseButton>
);

/**
 * @component
 */
export default CloseButton;
