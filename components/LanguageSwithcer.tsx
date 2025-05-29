'use client'

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function LanguageSwithcer(): React.JSX.Element {

    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language)
    const handleOptionClick = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        i18n.changeLanguage(e.currentTarget.value); 
    };


  
  return (
    <select onChange={handleOptionClick} value={i18n.language}>
        <option value="ua">Україньска</option>
        <option value="ru">Русский</option>
        <option value="en">Английский</option>
    </select>
  );
}



