import { useIntl } from "react-intl";

export function useT() {
  const intl = useIntl();
  return (id: string, defaultMessage: string) =>
    intl.formatMessage({ id, defaultMessage });
}
