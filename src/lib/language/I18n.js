import I18n from 'react-native-i18n';
import en from '../language/en';
import th from '../language/th';
 
I18n.fallbacks = true;
I18n.locale = 'th';

I18n.translations = {
  en,
  th
};
 
export default I18n;