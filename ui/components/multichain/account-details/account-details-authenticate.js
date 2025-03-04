import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Display,
  FontWeight,
  Severity,
  TextVariant,
} from '../../../helpers/constants/design-system';
import {
  BannerAlert,
  ButtonPrimary,
  ButtonSecondary,
  FormTextField,
  Text,
  Box,
} from '../../component-library';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { exportAccount, hideWarning } from '../../../store/actions';

export const AccountDetailsAuthenticate = ({ address, onCancel }) => {
  const t = useI18nContext();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');

  // Password error would result from appState
  const warning = useSelector((state) => state.appState.warning);

  const onSubmit = useCallback(() => {
    dispatch(exportAccount(password, address)).then((res) => {
      dispatch(hideWarning());
      return res;
    });
  }, [dispatch, password, address]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSubmit();
      }
    },
    [onSubmit],
  );

  return (
    <>
      <FormTextField
        marginTop={6}
        id="account-details-authenticate"
        label={t('enterYourPassword')}
        placeholder={t('password')}
        error={warning}
        helpText={warning}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        variant={TextVariant.bodySm}
        type="password"
        inputProps={{ onKeyPress: handleKeyPress }}
        labelProps={{ fontWeight: FontWeight.Medium }}
        autoFocus
      />
      <BannerAlert marginTop={6} severity={Severity.Danger}>
        <Text variant={TextVariant.bodySm}>{t('privateKeyWarning')}</Text>
      </BannerAlert>
      <Box display={Display.Flex} marginTop={6} gap={2}>
        <ButtonSecondary onClick={onCancel} block>
          {t('cancel')}
        </ButtonSecondary>
        <ButtonPrimary onClick={onSubmit} disabled={password === ''} block>
          {t('confirm')}
        </ButtonPrimary>
      </Box>
    </>
  );
};

AccountDetailsAuthenticate.propTypes = {
  address: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};
