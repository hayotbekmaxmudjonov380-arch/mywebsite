export type Locale = 'en' | 'uz' | 'ru'

export const locales: { id: Locale; label: string; flag: string }[] = [
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'uz', label: 'O\'zbek', flag: '🇺🇿' },
  { id: 'ru', label: 'Русский', flag: '🇷🇺' },
]

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    'nav.explore': 'Explore',
    'nav.categories': 'Categories',
    'nav.new': 'New arrivals',
    'nav.custom': 'Custom order',
    'nav.login': 'Sign in',
    'nav.search': 'Search',
    'nav.favorites': 'Favorites',
    'nav.cart': 'Cart',

    // Hero
    'hero.badge': 'DIGITAL PRODUCTS MARKETPLACE',
    'hero.title1': 'Ready-made software.',
    'hero.title2': 'Ready-made business.',
    'hero.desc': 'Mobile apps, desktop software, websites, Telegram bots and AI solutions — try, choose and launch your project faster.',
    'hero.cta1': 'EXPLORE PRODUCTS',
    'hero.cta2': 'WORK WITH US',

    // Trust Metrics
    'trust.quality': 'Quality guarantee',
    'trust.support': '24/7 Support',
    'trust.products': 'Ready-made products',
    'trust.secure': 'Fully protected',

    // Benefit Strip
    'benefit.reliable.title': 'Reliable and quality',
    'benefit.reliable.desc': 'Every product has been tested and passed quality control.',
    'benefit.fast.title': 'Fast delivery',
    'benefit.fast.desc': 'Purchase the product and start using it right away.',
    'benefit.support.title': 'Professional support',
    'benefit.support.desc': 'Help with products and services.',
    'benefit.secure.title': 'Secure payment system',
    'benefit.secure.desc': 'Payment and account data is processed securely.',

    // Categories
    'cat.eyebrow': 'The ecosystem',
    'cat.title': 'One place for your next digital product.',

    // Explore
    'explore.eyebrow': 'The collection',
    'explore.title': 'Find your unfair advantage.',
    'explore.search': 'Search the collection',
    'explore.all': 'All products',
    'explore.empty': 'No products match your search.',

    // Product Sections
    'section.featured.eyebrow': 'Selected by the studio',
    'section.featured.title': 'Made to be shipped.',
    'section.new.eyebrow': 'Just landed',
    'section.new.title': 'New in the collection.',

    // Stats
    'stats.eyebrow': 'Why itshop',
    'stats.title': 'Less time scaffolding. More time making.',
    'stats.rating': 'Average rating',
    'stats.creators': 'Creators building',
    'stats.support': 'Average support reply',
    'stats.source': 'Source included',

    // Custom
    'custom.eyebrow': 'Need something specific?',
    'custom.title': 'Let\'s build the thing that doesn\'t exist yet.',
    'custom.desc': 'From a sharp MVP to a full digital ecosystem, our studio can help you move from rough idea to remarkable product.',
    'custom.cta': 'Start a conversation',

    // Footer
    'footer.account': 'Account',
    'footer.admin': 'Admin',
    'footer.contact': 'Contact',
    'footer.copy': '© 2026 itshop Studio',

    // Contact
    'contact.title': 'Contact us',
    'contact.desc': 'Get in touch with us for any questions or collaboration.',
    'contact.telegram': 'Telegram',
    'contact.instagram': 'Instagram',
    'contact.phone': 'Phone',
    'contact.location': 'Our location',

    // Common
    'common.viewAll': 'View all',
    'common.viewProduct': 'View product',
    'common.addToCart': 'Add to cart',
    'common.backToCollection': 'Back to collection',
    'common.backHome': 'Back home',
    'common.returnHome': 'Return home',
    'common.notFound': 'not found',
    'common.cartClear': 'in cart · Clear',
    'common.searchPlaceholder': 'Search products, platforms, or technologies...',
    'common.searchTitle': 'Search collection',
    'common.close': 'Close',

    // Product Page
    'product.personal': 'Personal',
    'product.personalDesc': 'For learning and personal projects',
    'product.commercial': 'Commercial',
    'product.commercialDesc': 'For client and business use',
    'product.addToCart': 'Add to cart',
    'product.reviews': 'from {count} builders',

    // Account
    'account.eyebrow': 'Your space',
    'account.title': 'Account.',
    'account.downloads': 'Your downloads',
    'account.signIn': 'Sign in to access your purchased products and updates.',
    'account.signInBtn': 'Sign in',
    'account.profile': 'Profile settings',
    'account.profileDesc': 'Manage your details and notifications.',
    'account.contactMe': 'Contact Me',

    // Admin
    'admin.eyebrow': 'Studio console',
    'admin.title': 'Admin.',
    'admin.newProduct': 'New product',
    'admin.product': 'Product',
    'admin.status': 'Status',
    'admin.sales': 'Sales',
    'admin.revenue': 'Revenue',
    'admin.published': 'Published',

    // Category
    'category.categoryOf': 'Category',
    'category.empty': 'New products are in progress',

    // Earth animation
    'earth.entering': 'Entering the collection',
  },

  uz: {
    // Nav
    'nav.explore': 'Ko\'rish',
    'nav.categories': 'Kategoriyalar',
    'nav.new': 'Yangilar',
    'nav.custom': 'Maxsus buyurtma',
    'nav.login': 'Kirish',
    'nav.search': 'Qidirish',
    'nav.favorites': 'Sevimlilar',
    'nav.cart': 'Savat',

    // Hero
    'hero.badge': 'RAQAMLI MAHSULOTLAR MARKETPLACE',
    'hero.title1': 'Tayyor dastur.',
    'hero.title2': 'Tayyor biznes.',
    'hero.desc': 'Mobil ilovalar, desktop dasturlar, websaytlar, Telegram botlar va AI yechimlari — sinab ko\'ring, tanlang va loyihangizni tezroq ishga tushiring.',
    'hero.cta1': 'MAHSULOTLARNI KO\'RISH',
    'hero.cta2': 'BIZ BILAN ISHLASH',

    // Trust Metrics
    'trust.quality': 'Sifat kafolati',
    'trust.support': 'Qo\'llab-quvvatlash',
    'trust.products': 'Tayyor mahsulotlar',
    'trust.secure': 'To\'liq himoyalangan',

    // Benefit Strip
    'benefit.reliable.title': 'Ishonchli va sifatli',
    'benefit.reliable.desc': 'Har bir mahsulot sinovdan o\'tgan va sifat nazoratidan o\'tadi.',
    'benefit.fast.title': 'Tezkor yetkazib berish',
    'benefit.fast.desc': 'Mahsulotni sotib oling va foydalanishni tez boshlang.',
    'benefit.support.title': 'Professional qo\'llab-quvvatlash',
    'benefit.support.desc': 'Mahsulot va xizmat bo\'yicha yordam.',
    'benefit.secure.title': 'Xavfsiz to\'lov tizimi',
    'benefit.secure.desc': 'To\'lov va hisob ma\'lumotlari xavfsiz qayta ishlansin.',

    // Categories
    'cat.eyebrow': 'Ekotizim',
    'cat.title': 'Keyingi raqamli mahsulotingiz uchun bitta joy.',

    // Explore
    'explore.eyebrow': 'Kolleksiya',
    'explore.title': 'O\'z ustunligingizni toping.',
    'explore.search': 'Kolleksiyani qidirish',
    'explore.all': 'Barcha mahsulotlar',
    'explore.empty': 'Qidiruvga mos mahsulot topilmadi.',

    // Product Sections
    'section.featured.eyebrow': 'Studiya tanlovi',
    'section.featured.title': 'Yuborishga tayyor.',
    'section.new.eyebrow': 'Yangi qo\'shildi',
    'section.new.title': 'Kolleksiyada yangi.',

    // Stats
    'stats.eyebrow': 'Nega itshop',
    'stats.title': 'Kamroq vaqt sarflang. Ko\'proq yarating.',
    'stats.rating': 'O\'rtacha baho',
    'stats.creators': 'Yaratuvchilar qurmoqda',
    'stats.support': 'O\'rtacha javob vaqti',
    'stats.source': 'Manba kiritilgan',

    // Custom
    'custom.eyebrow': 'Nimadir kerakmi?',
    'custom.title': 'Hali mavjud bo\'lmagan narsani yarataylik.',
    'custom.desc': 'MVP dan to\'liq raqamli ekotizimgacha, studiyamiz g\'oyadan ajoyib mahsulotga o\'tishga yordam beradi.',
    'custom.cta': 'Suhbat boshlash',

    // Footer
    'footer.account': 'Hisob',
    'footer.admin': 'Admin',
    'footer.contact': 'Aloqa',
    'footer.copy': '© 2026 itshop Studio',

    // Contact
    'contact.title': 'Biz bilan bog\'laning',
    'contact.desc': 'Savol yoki hamkorlik uchun biz bilan bog\'laning.',
    'contact.telegram': 'Telegram',
    'contact.instagram': 'Instagram',
    'contact.phone': 'Telefon',
    'contact.location': 'Joylashuvimiz',

    // Common
    'common.viewAll': 'Barchasini ko\'rish',
    'common.viewProduct': 'Mahsulotni ko\'rish',
    'common.addToCart': 'Savatga qo\'shish',
    'common.backToCollection': 'Kolleksiyaga qaytish',
    'common.backHome': 'Bosh sahifaga',
    'common.returnHome': 'Bosh sahifaga qaytish',
    'common.notFound': 'topilmadi',
    'common.cartClear': 'savatda · Tozalash',
    'common.searchPlaceholder': 'Mahsulotlar, platformalar yoki texnologiyalarni qidirish...',
    'common.searchTitle': 'Kolleksiyani qidirish',
    'common.close': 'Yopish',

    // Product Page
    'product.personal': 'Shaxsiy',
    'product.personalDesc': 'O\'rganish va shaxsiy loyihalar uchun',
    'product.commercial': 'Tijorat',
    'product.commercialDesc': 'Mijoz va biznes uchun',
    'product.addToCart': 'Savatga qo\'shish',
    'product.reviews': '{count} ta yaratuvchidan',

    // Account
    'account.eyebrow': 'Sizning joyingiz',
    'account.title': 'Hisob.',
    'account.downloads': 'Yuklab olishlaringiz',
    'account.signIn': 'Sotib olingan mahsulotlaringiz va yangiliklarga kirish uchun tizimga kiring.',
    'account.signInBtn': 'Kirish',
    'account.profile': 'Profil sozlamalari',
    'account.profileDesc': 'Ma\'lumotlaringiz va bildirishnomalarni boshqaring.',
    'account.contactMe': 'Bog\'lanish',

    // Admin
    'admin.eyebrow': 'Studiya konsoli',
    'admin.title': 'Admin.',
    'admin.newProduct': 'Yangi mahsulot',
    'admin.product': 'Mahsulot',
    'admin.status': 'Holat',
    'admin.sales': 'Sotilgan',
    'admin.revenue': 'Daromad',
    'admin.published': 'Chop etilgan',

    // Category
    'category.categoryOf': 'Kategoriya',
    'category.empty': 'Yangi mahsulotlar tayyorlanmoqda',

    // Earth animation
    'earth.entering': 'Kolleksiyaga kirish',
  },

  ru: {
    // Nav
    'nav.explore': 'Смотреть',
    'nav.categories': 'Категории',
    'nav.new': 'Новинки',
    'nav.custom': 'Индивидуальный заказ',
    'nav.login': 'Войти',
    'nav.search': 'Поиск',
    'nav.favorites': 'Избранное',
    'nav.cart': 'Корзина',

    // Hero
    'hero.badge': 'РАЦИФРОВЫЕ ПРОДУКТЫ МАРКЕТПЛЕЙС',
    'hero.title1': 'Готовая программа.',
    'hero.title2': 'Готовый бизнес.',
    'hero.desc': 'Мобильные приложения, десктоп-программы, сайты, Telegram-боты и AI-решения — попробуйте, выберите и быстрее запустите свой проект.',
    'hero.cta1': 'СМОТРЕТЬ ПРОДУКТЫ',
    'hero.cta2': 'РАБОТАТЬ С НАМИ',

    // Trust Metrics
    'trust.quality': 'Гарантия качества',
    'trust.support': 'Поддержка',
    'trust.products': 'Готовые продукты',
    'trust.secure': 'Полная защита',

    // Benefit Strip
    'benefit.reliable.title': 'Надёжно и качественно',
    'benefit.reliable.desc': 'Каждый продукт прошёл тестирование и контроль качества.',
    'benefit.fast.title': 'Быстрая доставка',
    'benefit.fast.desc': 'Купите продукт и сразу начните использовать.',
    'benefit.support.title': 'Профессиональная поддержка',
    'benefit.support.desc': 'Помощь по продуктам и услугам.',
    'benefit.secure.title': 'Безопасная оплата',
    'benefit.secure.desc': 'Платёжные данные защищены и обрабатываются безопасно.',

    // Categories
    'cat.eyebrow': 'Экосистема',
    'cat.title': 'Одно место для вашего следующего цифрового продукта.',

    // Explore
    'explore.eyebrow': 'Коллекция',
    'explore.title': 'Найдите своё преимущество.',
    'explore.search': 'Поиск по коллекции',
    'explore.all': 'Все продукты',
    'explore.empty': 'Нет продуктов, соответствующих вашему запросу.',

    // Product Sections
    'section.featured.eyebrow': 'Выбор студии',
    'section.featured.title': 'Готово к отправке.',
    'section.new.eyebrow': 'Новинки',
    'section.new.title': 'Новое в коллекции.',

    // Stats
    'stats.eyebrow': 'Почему itshop',
    'stats.title': 'Меньше времени на заготовки. Больше времени на создание.',
    'stats.rating': 'Средняя оценка',
    'stats.creators': 'Создателей строят',
    'stats.support': 'Среднее время ответа',
    'stats.source': 'Исходный код включён',

    // Custom
    'custom.eyebrow': 'Нужно что-то особенное?',
    'custom.title': 'Давайте создадим то, чего ещё не существует.',
    'custom.desc': 'От лаконичного MVP до полноценной цифровой экосистемы — наша студия поможет превратить сырую идею в замечательный продукт.',
    'custom.cta': 'Начать разговор',

    // Footer
    'footer.account': 'Аккаунт',
    'footer.admin': 'Админ',
    'footer.contact': 'Контакт',
    'footer.copy': '© 2026 itshop Studio',

    // Contact
    'contact.title': 'Свяжитесь с нами',
    'contact.desc': 'Свяжитесь с нами по любым вопросам или для сотрудничества.',
    'contact.telegram': 'Telegram',
    'contact.instagram': 'Instagram',
    'contact.phone': 'Телефон',
    'contact.location': 'Наше расположение',

    // Common
    'common.viewAll': 'Смотреть все',
    'common.viewProduct': 'Подробнее',
    'common.addToCart': 'В корзину',
    'common.backToCollection': 'Назад к коллекции',
    'common.backHome': 'На главную',
    'common.returnHome': 'Вернуться на главную',
    'common.notFound': 'не найден',
    'common.cartClear': 'в корзине · Очистить',
    'common.searchPlaceholder': 'Поиск продуктов, платформ или технологий...',
    'common.searchTitle': 'Поиск по коллекции',
    'common.close': 'Закрыть',

    // Product Page
    'product.personal': 'Личная',
    'product.personalDesc': 'Для обучения и личных проектов',
    'product.commercial': 'Коммерческая',
    'product.commercialDesc': 'Для клиентов и бизнеса',
    'product.addToCart': 'В корзину',
    'product.reviews': 'от {count} создателей',

    // Account
    'account.eyebrow': 'Ваше пространство',
    'account.title': 'Аккаунт.',
    'account.downloads': 'Ваши загрузки',
    'account.signIn': 'Войдите, чтобы получить доступ к купленным продуктам и обновлениям.',
    'account.signInBtn': 'Войти',
    'account.profile': 'Настройки профиля',
    'account.profileDesc': 'Управляйте своими данными и уведомлениями.',
    'account.contactMe': 'Связаться',

    // Admin
    'admin.eyebrow': 'Консоль студии',
    'admin.title': 'Админ.',
    'admin.newProduct': 'Новый продукт',
    'admin.product': 'Продукт',
    'admin.status': 'Статус',
    'admin.sales': 'Продажи',
    'admin.revenue': 'Доход',
    'admin.published': 'Опубликован',

    // Category
    'category.categoryOf': 'Категория',
    'category.empty': 'Новые продукты в разработке',

    // Earth animation
    'earth.entering': 'Вход в коллекцию',
  },
}

// Category names translations
export const categoryNames: Record<Locale, Record<string, string>> = {
  en: { mobile: 'Mobile Apps', desktop: 'Desktop', web: 'Web Apps', telegram: 'Telegram', ai: 'AI Solutions', business: 'Business Systems' },
  uz: { mobile: 'Mobil ilovalar', desktop: 'Desktop', web: 'Veb ilovalar', telegram: 'Telegram', ai: 'AI yechimlari', business: 'Biznes tizimlari' },
  ru: { mobile: 'Мобильные приложения', desktop: 'Десктоп', web: 'Веб-приложения', telegram: 'Телеграм', ai: 'AI решения', business: 'Бизнес-системы' },
}

// Category descriptions translations
export const categoryDescriptions: Record<Locale, Record<string, string>> = {
  en: {
    mobile: 'iOS & Android products built for real users.',
    desktop: 'Native software for focused workflows.',
    web: 'Production-ready web experiences.',
    telegram: 'Bots and mini apps for communities.',
    ai: 'Intelligent tools that move ideas forward.',
    business: 'Systems that make operations flow.',
  },
  uz: {
    mobile: 'Haqiqiy foydalanuvchilar uchun iOS va Android mahsulotlari.',
    desktop: 'Ishlab chiqish uchun dasturiy ta\'minot.',
    web: 'Tayyor veb tajribalari.',
    telegram: 'Jamiyatlar uchun botlar va mini ilovalar.',
    ai: 'G\'oyalarni ilgari suradigan aqlli vositalar.',
    business: 'Operatsiyalarni tartibga soluvchi tizimlar.',
  },
  ru: {
    mobile: 'Продукты iOS и Android для реальных пользователей.',
    desktop: 'Нативное ПО для продуктивной работы.',
    web: 'Готовые к запуску веб-решения.',
    telegram: 'Боты и мини-приложения для сообществ.',
    ai: 'Умные инструменты для продвижения идей.',
    business: 'Системы для бесперебойной работы.',
  },
}

// Stats translations
export const statsTranslations: Record<Locale, Record<string, string>> = {
  en: { rating: 'Average rating', creators: 'Creators building', support: 'Average support reply', source: 'Source included' },
  uz: { rating: 'O\'rtacha baho', creators: 'Yaratuvchilar qurmoqda', support: 'O\'rtacha javob vaqti', source: 'Manba kiritilgan' },
  ru: { rating: 'Средняя оценка', creators: 'Создателей строят', support: 'Среднее время ответа', source: 'Исходный код включён' },
}

// License feature translations
export const licenseFeatures: Record<Locale, Record<string, string>> = {
  en: { personal: 'Personal', personalDesc: 'For learning and personal projects', commercial: 'Commercial', commercialDesc: 'For client and business use', sourceCode: 'Source code', documentation: 'Documentation', communitySupport: 'Community support', commercialLicense: 'Commercial license', prioritySupport: 'Priority support', lifetimeUpdates: 'Lifetime updates' },
  uz: { personal: 'Shaxsiy', personalDesc: 'O\'rganish va shaxsiy loyihalar uchun', commercial: 'Tijorat', commercialDesc: 'Mijoz va biznes uchun', sourceCode: 'Manba kodi', documentation: 'Hujjatlar', communitySupport: 'Jamiyat qo\'llab-quvvatlashi', commercialLicense: 'Tijorat litsenziyasi', prioritySupport: 'Ustuvor qo\'llab-quvvatlash', lifetimeUpdates: 'Umrbod yangilanishlar' },
  ru: { personal: 'Личная', personalDesc: 'Для обучения и личных проектов', commercial: 'Коммерческая', commercialDesc: 'Для клиентов и бизнеса', sourceCode: 'Исходный код', documentation: 'Документация', communitySupport: 'Поддержка сообщества', commercialLicense: 'Коммерческая лицензия', prioritySupport: 'Приоритетная поддержка', lifetimeUpdates: 'Пожизненные обновления' },
}
