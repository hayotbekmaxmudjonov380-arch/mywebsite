export type Locale = 'en' | 'uz' | 'ru'

export const locales: { id: Locale; label: string; flag: string }[] = [
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'uz', label: 'O\'zbek', flag: '🇺🇿' },
  { id: 'ru', label: 'Русский', flag: '🇷🇺' },
]

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    'nav.categories': 'Categories',
    'nav.programs': 'Programs',
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

    // Programs
    'programs.eyebrow': 'Our programs',
    'programs.title': 'Download our applications.',
    'programs.desc': 'Ready-made software for your business. Download and start using right away.',
    'programs.download': 'Open',
    'programs.app1.name': 'Desktop Programs',
    'programs.app1.desc': 'Native desktop applications for Windows, macOS and Linux.',
    'programs.app2.name': 'Mobile Apps',
    'programs.app2.desc': 'iOS and Android applications for smartphones and tablets.',
    'programs.app3.name': 'Websites',
    'programs.app3.desc': 'Modern websites, web apps and landing pages.',
    'programs.app4.name': 'Institute Materials',
    'programs.app4.desc': 'Slides, Word documents, articles, course works and independent works.',

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

    // Contact New
    'contact_new.eyebrow': 'CONTACT US',
    'contact_new.title1': 'Have a project?',
    'contact_new.title2': 'Let\'s',
    'contact_new.title3': 'launch it together.',
    'contact_new.desc': 'For questions about ready-made products, custom orders or collaboration, contact us.',
    'contact_new.cta1': 'WRITE ON TELEGRAM',
    'contact_new.cta2': 'ORDER PROJECT',
    'contact_new.card1.title': 'Telegram',
    'contact_new.card1.value': '@maxmudjonovhayotbek',
    'contact_new.card1.desc': 'You can get a quick answer',
    'contact_new.card2.title': 'Instagram',
    'contact_new.card2.value': '@maxmudjonov_hayotbek',
    'contact_new.card2.desc': 'News and projects',
    'contact_new.card3.title': 'Phone',
    'contact_new.card3.value': '+998 99 768 96 85',
    'contact_new.card3.desc': 'Every day 09:00 – 18:00',
    'contact_new.location': 'Urganch, IT Park',
    'contact_new.direction': 'OPEN DIRECTION',

    // Footer New
    'footer_new.tagline': 'Ready-made digital products marketplace',
    'footer_new.products.title': 'PRODUCTS',
    'footer_new.products.mobile': 'Mobile apps',
    'footer_new.products.web': 'Websites',
    'footer_new.products.telegram': 'Telegram bots',
    'footer_new.products.desktop': 'Desktop apps',
    'footer_new.products.ai': 'AI solutions',
    'footer_new.company.title': 'COMPANY',
    'footer_new.company.about': 'About us',
    'footer_new.company.partners': 'Partnership',
    'footer_new.company.contact': 'Contact',
    'footer_new.company.blog': 'Blog',
    'footer_new.company.careers': 'Careers',
    'footer_new.support.title': 'SUPPORT',
    'footer_new.support.faq': 'FAQ',
    'footer_new.support.returns': 'Return policy',
    'footer_new.support.terms': 'Terms of use',
    'footer_new.support.privacy': 'Privacy policy',
    'footer_new.support.license': 'License',
    'footer_new.newsletter.title': 'NEWSLETTER',
    'footer_new.newsletter.desc': 'Be the first to get news and special offers.',
    'footer_new.newsletter.placeholder': 'Your email address',
    'footer_new.copy': '© 2026 ITSHOP. All rights reserved.',
    'footer_new.slogan': 'ITSHOP — One step ahead towards digital future.',

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
    'nav.categories': 'Kategoriyalar',
    'nav.programs': 'Dasturlar',
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

    // Programs
    'programs.eyebrow': 'Bizning dasturlarimiz',
    'programs.title': 'Dasturlarimizni yuklab oling.',
    'programs.desc': 'Biznesingiz uchun tayyor dasturiy ta\'minot. Yuklab oling va darhol foydalaning.',
    'programs.download': 'Ochish',
    'programs.app1.name': 'Desktop Dasturlar',
    'programs.app1.desc': 'Windows, macOS va Linux uchun dasturiy ta\'minot.',
    'programs.app2.name': 'Mobil Ilovalar',
    'programs.app2.desc': 'Smartfon va planshetlar uchun iOS va Android ilovalar.',
    'programs.app3.name': 'Websaytlar',
    'programs.app3.desc': 'Zamonaviy veb-saytlar, veb-ilovalar va landing sahifalar.',
    'programs.app4.name': 'Institut Materiallari',
    'programs.app4.desc': 'Slaydlar, Word hujjatlar, maqolalar, kurs ishlari va mustaqil ishlar.',

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

    // Contact New
    'contact_new.eyebrow': 'BIZ BILAN BOG\'LANING',
    'contact_new.title1': 'Loyihangiz bormi?',
    'contact_new.title2': 'Keling, birga',
    'contact_new.title3': 'ishga tushiramiz.',
    'contact_new.desc': 'Tayyor mahsulot bo\'yicha savol, maxsus buyurtma yoki hamkorlik uchun biz bilan bog\'laning.',
    'contact_new.cta1': 'TELEGRAMDA YOZISH',
    'contact_new.cta2': 'LOYIHA BUYURTMA QILISH',
    'contact_new.card1.title': 'Telegram',
    'contact_new.card1.value': '@maxmudjonovhayotbek',
    'contact_new.card1.desc': 'Tezkor javob olishingiz mumkin',
    'contact_new.card2.title': 'Instagram',
    'contact_new.card2.value': '@maxmudjonov_hayotbek',
    'contact_new.card2.desc': 'Yangiliklar va loyihalar',
    'contact_new.card3.title': 'Telefon',
    'contact_new.card3.value': '+998 99 768 96 85',
    'contact_new.card3.desc': 'Har kuni 09:00 – 18:00',
    'contact_new.location': 'Urganch, IT Park',
    'contact_new.direction': 'YO\'NALISHNI OCHISH',

    // Footer New
    'footer_new.tagline': 'Tayyor raqamli mahsulotlar marketplace',
    'footer_new.products.title': 'MAHSULOTLAR',
    'footer_new.products.mobile': 'Mobil ilovalar',
    'footer_new.products.web': 'Websaytlar',
    'footer_new.products.telegram': 'Telegram botlar',
    'footer_new.products.desktop': 'Desktop dasturlar',
    'footer_new.products.ai': 'AI yechimlar',
    'footer_new.company.title': 'KOMPANIYA',
    'footer_new.company.about': 'Biz haqimizda',
    'footer_new.company.partners': 'Hamkorlik',
    'footer_new.company.contact': 'Aloqa',
    'footer_new.company.blog': 'Blog',
    'footer_new.company.careers': 'Karyera',
    'footer_new.support.title': 'YORDAM',
    'footer_new.support.faq': 'FAQ',
    'footer_new.support.returns': 'Qaytarish siyosati',
    'footer_new.support.terms': 'Foydalanish shartlari',
    'footer_new.support.privacy': 'Maxfiylik siyosati',
    'footer_new.support.license': 'Litsenziya',
    'footer_new.newsletter.title': 'NEWSLETTER',
    'footer_new.newsletter.desc': 'Yangiliklar va maxsus takliflarni birinchilardan bo\'lib oling.',
    'footer_new.newsletter.placeholder': 'Email manzilingiz',
    'footer_new.copy': '© 2026 ITSHOP. Barcha huquqlar himoyalangan.',
    'footer_new.slogan': 'ITSHOP — Raqamli kelajak sari bir qadam oldinda.',

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
    'nav.categories': 'Категории',
    'nav.programs': 'Программы',
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

    // Programs
    'programs.eyebrow': 'Наши программы',
    'programs.title': 'Скачайте наши приложения.',
    'programs.desc': 'Готовое программное обеспечение для вашего бизнеса. Скачайте и начните использовать сразу.',
    'programs.download': 'Открыть',
    'programs.app1.name': 'Desktop Dasturlar',
    'programs.app1.desc': 'Windows, macOS va Linux uchun dasturiy ta\'minot.',
    'programs.app2.name': 'Mobil Ilovalar',
    'programs.app2.desc': 'Smartfon va planshetlar uchun iOS va Android ilovalar.',
    'programs.app3.name': 'Websaytlar',
    'programs.app3.desc': 'Zamonaviy veb-saytlar, veb-ilovalar va landing sahifalar.',
    'programs.app4.name': 'Institut Materiallari',
    'programs.app4.desc': 'Slaydlar, Word hujjatlar, maqolalar, kurs ishlari va mustaqil ishlar.',

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

    // Contact New
    'contact_new.eyebrow': 'СВЯЖИТЕСЬ С НАМИ',
    'contact_new.title1': 'Есть проект?',
    'contact_new.title2': 'Давайте',
    'contact_new.title3': 'запустим его вместе.',
    'contact_new.desc': 'По вопросам о готовых продуктах, индивидуальном заказе или сотрудничестве свяжитесь с нами.',
    'contact_new.cta1': 'НАПИСАТЬ В TELEGRAM',
    'contact_new.cta2': 'ЗАКАЗАТЬ ПРОЕКТ',
    'contact_new.card1.title': 'Telegram',
    'contact_new.card1.value': '@maxmudjonovhayotbek',
    'contact_new.card1.desc': 'Можете получить быстрый ответ',
    'contact_new.card2.title': 'Instagram',
    'contact_new.card2.value': '@maxmudjonov_hayotbek',
    'contact_new.card2.desc': 'Новости и проекты',
    'contact_new.card3.title': 'Телефон',
    'contact_new.card3.value': '+998 99 768 96 85',
    'contact_new.card3.desc': 'Ежедневно 09:00 – 18:00',
    'contact_new.location': 'Ургенч, IT Park',
    'contact_new.direction': 'ОТКРЫТЬ МАРШРУТ',

    // Footer New
    'footer_new.tagline': 'Маркетплейс готовых цифровых продуктов',
    'footer_new.products.title': 'ПРОДУКТЫ',
    'footer_new.products.mobile': 'Мобильные приложения',
    'footer_new.products.web': 'Сайты',
    'footer_new.products.telegram': 'Telegram боты',
    'footer_new.products.desktop': 'Десктоп приложения',
    'footer_new.products.ai': 'AI решения',
    'footer_new.company.title': 'КОМПАНИЯ',
    'footer_new.company.about': 'О нас',
    'footer_new.company.partners': 'Партнёрство',
    'footer_new.company.contact': 'Контакт',
    'footer_new.company.blog': 'Блог',
    'footer_new.company.careers': 'Карьера',
    'footer_new.support.title': 'ПОДДЕРЖКА',
    'footer_new.support.faq': 'FAQ',
    'footer_new.support.returns': 'Политика возврата',
    'footer_new.support.terms': 'Условия использования',
    'footer_new.support.privacy': 'Политика конфиденциальности',
    'footer_new.support.license': 'Лицензия',
    'footer_new.newsletter.title': 'Рассылка',
    'footer_new.newsletter.desc': 'Будьте первыми, кто получит новости и специальные предложения.',
    'footer_new.newsletter.placeholder': 'Ваш email адрес',
    'footer_new.copy': '© 2026 ITSHOP. Все права защищены.',
    'footer_new.slogan': 'ITSHOP — На шаг впереди к цифровому будущему.',

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
  en: { mobile: 'Mobile Apps', desktop: 'Desktop', web: 'Web Apps', telegram: 'Telegram', ai: 'AI Solutions', business: 'Business Systems', institute: 'Institute Materials' },
  uz: { mobile: 'Mobil ilovalar', desktop: 'Desktop', web: 'Veb ilovalar', telegram: 'Telegram', ai: 'AI yechimlari', business: 'Biznes tizimlari', institute: 'Institut materiallari' },
  ru: { mobile: 'Мобильные приложения', desktop: 'Десктоп', web: 'Веб-приложения', telegram: 'Телеграм', ai: 'AI решения', business: 'Бизнес-системы', institute: 'Материалы института' },
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
    institute: 'Slides, documents, articles and coursework.',
  },
  uz: {
    mobile: 'Haqiqiy foydalanuvchilar uchun iOS va Android mahsulotlari.',
    desktop: 'Ishlab chiqish uchun dasturiy ta\'minot.',
    web: 'Tayyor veb tajribalari.',
    telegram: 'Jamiyatlar uchun botlar va mini ilovalar.',
    ai: 'G\'oyalarni ilgari suradigan aqlli vositalar.',
    business: 'Operatsiyalarni tartibga soluvchi tizimlar.',
    institute: 'Slaydlar, hujjatlar, maqolalar va kurs ishlari.',
  },
  ru: {
    mobile: 'Продукты iOS и Android для реальных пользователей.',
    desktop: 'Нативное ПО для продуктивной работы.',
    web: 'Готовые к запуску веб-решения.',
    telegram: 'Боты и мини-приложения для сообществ.',
    ai: 'Умные инструменты для продвижения идей.',
    business: 'Системы для бесперебойной работы.',
    institute: 'Слайды, документы, статьи и курсовые работы.',
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
