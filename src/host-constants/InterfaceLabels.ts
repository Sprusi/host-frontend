/* eslint-disable i18n/no-russian-character */

export const SUCCESS = 'Выполнено успешно';
export const ERR_DEFAULT = 'Произошла ошибка';
export const REQUIRED_FIELD = 'Поле обязательно для заполнения';
export const BACK = 'Назад';
export const VALIDATION_ERROR = 'Не все обязательные поля были заполнены';

/**
 *  AXIOS
 */
export const NO_CONNECTION_TO_SERVER = 'Нет связи с сервером';
export const ACCESS_DENIED = 'Доступ запрещен';
export const LOGIN_ERROR = 'Ошибка входа в систему';
export const SERVER_REQUEST_ERROR = 'Ошибка в запросе к серверу';
export const REQUEST_ERROR = 'Ошибка в запросе';
export const PAGE_NOT_FOUND = 'Страница или документ не найдена';
export const INACTIVE_SESSION = 'Сессия истекла или неактивна';
export const INTERNAL_SERVER_ERROR = 'Ошибка на стороне сервера';
export const ERROR = (key: string) => 'Ошибка ' + key;
export const SOMETHING_WENT_WRONG = 'Что-то пошло не так ...';

/**
 *  AUTH
 */
export const AUTH_SIGNUP = 'Регистрация';
export const AUTH_SIGNIN = 'Вход в систему';
export const AUTH_AUTH = 'Авторизация';
export const AUTH_TO_SIGNUP = 'Зарегистрироваться';
export const AUTH_TO_SIGNIN = 'Войти';
export const AUTH_TO_AUTHORIZATION = 'Авторизоваться';
export const AUTH_EMAIL = 'Почта';
export const AUTH_PASSWORD = 'Пароль';
export const AUTH_REPASSWORD = 'Повторите пароль';
export const AUTH_REPASSWORD_NOT_MATCH = 'Повторный пароль не совпадает';

/**
 *  HEADER
 */
export const HEADER_LOGO_TEXT = 'ТВОЙ РИНГ';
export const HEADER_GYM_PROJECT_TYPE = 'Арена';
export const HEADER_SHOP_PROJECT_TYPE = 'Питание';
export const HEADER_SETTINGS_EXIT = 'Выйти';

/**
 *  PROFILE
 */
export const PERSON_MALE = 'Мужчина';
export const PERSON_FEMALE = 'Женщина';
export const PERSON_PHONE = 'Телефон';
export const PERSON_SEX = 'Пол';
export const PERSON_AGE = 'Возрост';
export const PERSON_HEIGHT = 'Рост';
export const PERSON_WEIGHT = 'Вес';

export const PERSON_MODAL_EDIT_TITLE = 'Редактирование';
export const PERSON_MODAL_EDIT_FIELD = {
  firstName: 'Фамилия',
  middleName: 'Имя',
  lastName: 'Отчество',
  sex: 'Пол',
  age: 'Возрост',
  height: 'Рост',
  weight: 'Вес',
};
export const PERSON_RECOMMEND_CALCULATION_POP_UP = 'Необходимо для расчета рекомендаций';
export const PERSON_ID_ERROR = 'Не найден ID пользователя';
export const PERSON_PROFILE_EDIT = 'Редактировать';
