'use client'

import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'ru', 
        interpolation: {
            escapeValue: false,
        },
        supportedLngs: ['ru', 'en', 'ua'],
        resources: {
            ru: {
                days: {
                    "monday": "Понедельник",
                    "tuesday": "Вторник",
                    "wednesday": "Среда",
                    "thursday": "Четверг",
                    "friday": "Пятница",
                    "saturday": "Суббота",
                    "sunday": "Воскресенье"
                }
            },
            
            en: {

            },

            ua: {

            }
        }
    });


export default i18n; 