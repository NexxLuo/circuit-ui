import React from 'react';

import { CardNumberInput, cardSchemeIcons } from '..';
import { schemes as cardSchemes } from '../..';
import { reduce } from '../../../../util/fp';

describe('CardNumberInput', () => {
  const { SCHEMES } = cardSchemes;
  const getIconComponents = reduce(
    (acc, scheme) => ({ ...acc, [scheme]: cardSchemeIcons[scheme] }),
    {}
  );

  const schemes = [
    SCHEMES.MASTERCARD,
    SCHEMES.VISA,
    SCHEMES.DINERS,
    SCHEMES.JCB
  ];
  const schemeIcons = getIconComponents(schemes);
  const manySchemes = [
    SCHEMES.MASTERCARD,
    SCHEMES.VISA,
    SCHEMES.DINERS,
    SCHEMES.DISCOVER,
    SCHEMES.JCB,
    SCHEMES.ELO,
    SCHEMES.MAESTRO
  ];
  const manySchemeIcons = getIconComponents(manySchemes);

  const detectedComponent = (
    <CardNumberInput
      acceptedCardSchemes={schemeIcons}
      onChange={() => {}}
      detectedCardScheme={SCHEMES.VISA}
      name="creditCardInput"
      value="4485 7197 7461 1397"
    />
  );
  const emptyComponent = (
    <CardNumberInput
      acceptedCardSchemes={schemeIcons}
      onChange={() => {}}
      detectedCardScheme={SCHEMES.VISA}
      name="creditCardInput"
    />
  );
  const manySchemesComponent = (
    <CardNumberInput
      acceptedCardSchemes={manySchemeIcons}
      onChange={() => {}}
      detectedCardScheme=""
      name="creditCardInput"
    />
  );

  /**
   * Style tests.
   *
   * Using render in these tests, because text-mask relies
   * on refs and those are not well supported in react's
   * test renderer.
   */

  it('should render with default styles', () => {
    const actual = render(emptyComponent);
    expect(actual).toMatchSnapshot();
  });

  it('should render with styles for more than 5 card schemes', () => {
    const actual = render(manySchemesComponent);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */

  it('should render all but the detected card scheme with reduced opacity', () => {
    const wrapper = shallow(detectedComponent);
    const disabledProps = wrapper.find('li').map(el => el.prop('disabled'));
    const disabledWrappersCount = disabledProps.reduce(
      (acc, prop) => acc + prop,
      0
    );
    expect(disabledWrappersCount).toBe(3);
    const actualStyles = render(detectedComponent);
    expect(actualStyles).toMatchSnapshot();
  });

  // FIXME: Figure out what's the best combination of type/autocomplete for
  // this input.
  it.skip('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<form>{emptyComponent}</form>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
