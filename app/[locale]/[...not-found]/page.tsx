import { notFound } from 'next/navigation';

//из-за особенностей next.js, not-found не работает в динамических маршрутах, потому по гайду отсюда 
//https://github.com/i18nexus/next-i18n-router/issues/36#issuecomment-1821887026
//проблеме решена с использованием дополнительного динамического маршрута, который вызывает not-found вручную
//для локализации not found, так как нет доступа к params, приходится использовать headers и получить язык из заголовка. 
// //Not-found из-за этого не является SSG компонентом


export default function NotFoundCatchAll() {
  notFound();
}