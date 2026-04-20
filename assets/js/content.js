export const siteContent = {
  defaultLanguage: 'en',
  languages: [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'ru', label: 'RU', name: 'Русский' }
  ],
  shared: {
    instagramUrl: 'https://www.instagram.com/no_subs_apps',
    privacyUrl: 'https://privacy.easyai.org.kz',
    email: 'NoSubsApps@gmail.com'
  },
  en: {
    meta: {
      title: 'NoSubsApps — offline-first iOS apps with zero subscriptions',
      description: 'NoSubsApps is a family-run app studio by EasyAI. We build offline-first iOS apps with no subscriptions, no ads, no in-app purchases, and no data collection.'
    },
    nav: {
      apps: 'Apps',
      manifesto: 'Manifesto',
      story: 'Story',
      roadmap: 'Roadmap',
      contact: 'Contact'
    },
    hero: {
      kicker: 'NoSubsApps by EasyAI',
      title: 'The anti-subscription app studio.',
      lead: 'We build offline-first iOS apps that respect people, time, and privacy. No subscriptions. No ads. No in-app purchases. No data collection.',
      actions: [
        { label: 'See apps', href: '#apps', style: 'primary' },
        { label: 'Read manifesto', href: '#manifesto', style: 'ghost' },
        { label: 'Open Instagram', href: 'https://www.instagram.com/no_subs_apps', style: 'ghost', external: true }
      ]
    },
    stats: [
      { value: '0', label: 'paid subscriptions' },
      { value: '0', label: 'ads' },
      { value: '0', label: 'data collection' },
      { value: '50+', label: 'planned iOS apps' }
    ],
    ticker: ['local processing', 'no accounts', 'no ad layer', 'no tracking', 'complete features', 'built by a family', '15-language localization', 'offline-first'],
    principles: {
      kicker: 'Operating system',
      title: 'Privacy is not a feature. It is the baseline.',
      lead: 'Every product starts with hard constraints: local processing, no account wall, no ads, no subscription pressure, and no unnecessary permissions.',
      items: [
        {
          title: 'No accounts',
          text: 'People should not create a profile just to use a simple tool.'
        },
        {
          title: 'Local first',
          text: 'The work happens on the device whenever the task can be done offline.'
        },
        {
          title: 'No monetization traps',
          text: 'No “free trial” traps, no paid subscriptions, no IAP gates, no ad inventory.'
        },
        {
          title: 'Honest limits',
          text: 'If hardware cannot measure something reliably, the app must say so instead of pretending.'
        },
        {
          title: 'Full functionality',
          text: 'The app should feel complete on day one, not like a demo for a future upsell.'
        },
        {
          title: 'Human support',
          text: 'Ideas, bugs, and improvements come from real user messages, not dashboards.'
        }
      ]
    },
    portfolio: {
      kicker: 'Portfolio',
      title: 'Apps that do the job without owning your attention.',
      lead: 'The portfolio starts with Pulse Monitor and grows into a wider ecosystem of practical iOS utilities with the same fixed policy.',
      apps: [
        {
          name: 'Pulse Monitor',
          category: 'Health, recovery, and breathing',
          icon: 'assets/images/pulse-icon.png',
          postImage: 'assets/images/pulse-post.jpg',
          alt: 'Pulse Monitor app artwork',
          text: 'Pulse, HRV, breathing, and recovery — using only iPhone sensors, with strict signal-quality checks and export.',
          badges: ['iPhone sensors', 'Signal quality checks', 'Export', 'Local processing'],
          safety: 'Important: this app does not treat, diagnose, or replace a medical device.',
          post: {
            title: 'The honest-health-app post',
            intro: 'The App Store is full of apps promising “camera-based blood pressure” or “clinical-grade oxygen,” with ads sometimes even suggesting you “toss your blood pressure monitor.” It sounds flashy. But it is a dangerous logic: selling people confidence that simply is not there.',
            paragraphs: [
              'We took a different approach. Pulse Monitor is a transparent, science-minded app that works strictly within the hardware realities of the iPhone.',
              'PPG camera → heart rate and HRV metrics.',
              'Motion sensors → breathing and respiratory tests.',
              'Tests with clear logic, guidance, and safety checks.',
              'If the signal is poor, the measurement is rejected — not twisted into a pretty number.',
              'No subscriptions. No ads. No accounts. No data collection. Local processing.',
              'Important: this app does not treat or diagnose medical conditions.',
              'Which promises in health apps irritate you the most — and why?'
            ],
            summaryLabel: 'Read the full post'
          },
          links: [
            { label: 'Privacy policy', href: 'https://privacy.easyai.org.kz', external: true },
            { label: 'Instagram', href: 'https://www.instagram.com/no_subs_apps', external: true }
          ]
        }
      ]
    },
    manifesto: {
      kicker: 'Manifesto',
      title: 'We declare the end of the subscription era.',
      intro: 'We are no_subs_apps. We build an ecosystem of mobile apps with fixed rules.',
      bullets: ['0 paid subscriptions', '0 ads', '0 in-app purchases', '0 data collection', '0 unsolicited notifications'],
      paragraphs: [
        'This is not a promotion. It is our policy. Forever.',
        'Our apps have no servers. We do not identify users. We do not see your photos. We do not store your documents. Everything you do in the app stays exclusively on your device.',
        'Your data belongs to you. Not to us. Not to advertisers.',
        'Free does not mean cheap. We are perfectionists. We aim to make our apps more capable and more convenient than paid alternatives. We build the apps we want to use ourselves.',
        'Why do we do this? Because the digital world should be honest.',
        'Use it. Share it with the people you love. Be free.'
      ],
      summaryLabel: 'Read the full manifesto'
    },
    story: {
      kicker: 'Our story',
      title: 'Not a corporation. A family.',
      intro: 'We are Ivan and Ksenia. We are not a corporation. We are a family.',
      paragraphs: [
        'A few years ago, our life was reset to zero. In 2022, we moved to Kazakhstan and started from scratch. Ivan lost 20 kg from stress and lack of money, worked for $6 a day, lived in a hostel, and learned to code at night.',
        'The hardest ordeal was Ksenia’s illness — cancer. In a time like that, everything changes: time, energy, and money take on a different value.',
        'That is when the most practical part began. We built small websites for ourselves: to keep track of things, navigate tasks faster, avoid keeping everything in our heads, and avoid depending on other people’s services.',
        'We tried to find alternatives and repeatedly ran into the same thing: either expensive, or a forever subscription, or a paywall at every step, or strange demands and unnecessary permissions. When your priorities are uncompromising, you want to pay only for what you truly cannot do without — and you do not want intrusiveness in the basics.',
        'At some point, it became clear: it is simpler and more honest to build it ourselves, exactly the way we need it. No selling attention. No “unlock this feature.” No tracking. No data collection. Just a product that works.',
        'That is how no_subs_apps was born: a portfolio of apps with fixed rules — no subscriptions, no ads, no in-app purchases, no data collection. Everything works locally on the device, with no accounts. Each app ships with full functionality and localization in 15 languages.',
        'Honestly, development became our way to hold on. When everything around you is heavy, working on a product brings back clarity: design, logic, discipline, a sense of control. We know how to build products neatly and meticulously, and we do not want to give that up.',
        'We collect experience from different fields and turn it into apps that, in our view, are built honestly. If that helps people, then it has all been worth it. Right now we have dozens of ideas and a big goal: to prove you can build strong products and still remain human.',
        'If this approach resonates with you, you can support us via the link in our profile. It is absolutely not necessary, but it gives us the strength to keep going.'
      ],
      summaryLabel: 'Read the full story'
    },
    roadmap: {
      kicker: 'Roadmap',
      title: '50+ iOS apps, one fixed policy.',
      lead: 'We are building the NoSubsApps portfolio: 50+ iOS apps across multiple categories that solve real tasks without subscriptions, ads, in-app purchases, or data collection.',
      cards: [
        {
          title: 'How we build and ship',
          items: [
            'We release apps one at a time: first we bring an app to stability, then we move on.',
            'We improve existing apps: bug fixes, optimization, UX improvements, and user feedback.',
            'We work full-time exclusively on NoSubsApps to support what is already released and to ship new apps.'
          ]
        },
        {
          title: 'How to suggest an idea',
          items: [
            'Tell us what the app is.',
            'Explain why you need it: “I do X, I need Y.”',
            'Send three must-have features that are non-negotiable.',
            'If a paid alternative exists, name it and explain what annoys you about it in one or two sentences.'
          ]
        },
        {
          title: 'How we choose what is next',
          items: [
            'We queue ideas that appear most often and solve a clear recurring pain point.',
            'We prioritize tasks we can deliver fully offline and at a high quality on iOS.',
            'You can also message us with improvements, bug reports, or new features for existing apps.'
          ]
        }
      ]
    },
    contact: {
      kicker: 'Contact',
      title: 'Send us app ideas, bugs, and brutal feedback.',
      lead: 'Use Instagram Direct or email. The best message explains the task, the use case, and the exact feature that would make the tool useful.',
      cards: [
        { label: 'Email', value: 'NoSubsApps@gmail.com', href: 'mailto:NoSubsApps@gmail.com', action: 'Copy email' },
        { label: 'Instagram', value: '@no_subs_apps', href: 'https://www.instagram.com/no_subs_apps', external: true, action: 'Open profile' },
        { label: 'Privacy policies', value: 'privacy.easyai.org.kz', href: 'https://privacy.easyai.org.kz', external: true, action: 'Open policies' }
      ]
    },
    footer: {
      legal: 'NoSubsApps is a product brand operated by Individual Entrepreneur EasyAI.',
      privacy: 'Privacy policies'
    },
    ui: {
      readLess: 'Collapse',
      copied: 'Copied',
      copyFailed: 'Copy manually',
      backToTop: 'Back to top',
      external: 'opens in a new tab'
    }
  },
  ru: {
    meta: {
      title: 'NoSubsApps — iOS-приложения без подписок, рекламы и сбора данных',
      description: 'NoSubsApps — семейная студия приложений от EasyAI. Мы создаём iOS-приложения с локальной обработкой, без подписок, рекламы, встроенных покупок и сбора данных.'
    },
    nav: {
      apps: 'Приложения',
      manifesto: 'Манифест',
      story: 'История',
      roadmap: 'Роадмап',
      contact: 'Контакты'
    },
    hero: {
      kicker: 'NoSubsApps by EasyAI',
      title: 'Студия против подписочной эпохи.',
      lead: 'Мы создаём iOS-приложения, которые уважают людей, время и приватность. Без подписок. Без рекламы. Без встроенных покупок. Без сбора данных.',
      actions: [
        { label: 'Смотреть приложения', href: '#apps', style: 'primary' },
        { label: 'Читать манифест', href: '#manifesto', style: 'ghost' },
        { label: 'Открыть Instagram', href: 'https://www.instagram.com/no_subs_apps', style: 'ghost', external: true }
      ]
    },
    stats: [
      { value: '0', label: 'платных подписок' },
      { value: '0', label: 'рекламы' },
      { value: '0', label: 'сбора данных' },
      { value: '50+', label: 'iOS-приложений в плане' }
    ],
    ticker: ['локальная обработка', 'без аккаунтов', 'без рекламы', 'без трекинга', 'полные функции', 'семейная студия', '15 языков', 'offline-first'],
    principles: {
      kicker: 'Операционная система',
      title: 'Приватность — не функция. Это базовый уровень.',
      lead: 'Каждый продукт начинается с жёстких правил: локальная обработка, без аккаунта, без рекламы, без давления подписками и без лишних разрешений.',
      items: [
        {
          title: 'Без аккаунтов',
          text: 'Человек не обязан создавать профиль, чтобы пользоваться простым инструментом.'
        },
        {
          title: 'Сначала локально',
          text: 'Если задачу можно решить офлайн, работа происходит на устройстве.'
        },
        {
          title: 'Без ловушек монетизации',
          text: 'Без “пробных периодов”, подписок, встроенных покупок и рекламного слоя.'
        },
        {
          title: 'Честные ограничения',
          text: 'Если железо не может измерить что-то надёжно, приложение должно честно сказать об этом.'
        },
        {
          title: 'Полная функциональность',
          text: 'Приложение должно ощущаться готовым продуктом, а не демоверсией для будущего апсейла.'
        },
        {
          title: 'Живая обратная связь',
          text: 'Идеи, ошибки и улучшения приходят от реальных сообщений пользователей, а не из рекламных дашбордов.'
        }
      ]
    },
    portfolio: {
      kicker: 'Портфель',
      title: 'Приложения, которые решают задачу и не забирают внимание.',
      lead: 'Портфель начинается с Pulse Monitor и вырастает в экосистему практичных iOS-инструментов с одной неизменной политикой.',
      apps: [
        {
          name: 'Pulse Monitor',
          category: 'Здоровье, восстановление и дыхание',
          icon: 'assets/images/pulse-icon.png',
          postImage: 'assets/images/pulse-post.jpg',
          alt: 'Обложка Pulse Monitor',
          text: 'Пульс, ВСР, дыхание и восстановление — только датчики iPhone, жёсткая проверка качества сигнала и экспорт.',
          badges: ['Датчики iPhone', 'Проверка сигнала', 'Экспорт', 'Локальная обработка'],
          safety: 'Важно: приложение не лечит, не диагностирует и не заменяет медицинское устройство.',
          post: {
            title: 'Пост про честное health-приложение',
            intro: 'В App Store полно приложений, которые обещают “измерение давления камерой” или “клиническую сатурацию”, а реклама иногда предлагает чуть ли не выбросить тонометр. Это выглядит ярко, но логика опасная: продавать людям уверенность, которой на самом деле нет.',
            paragraphs: [
              'Мы выбрали другой подход. Pulse Monitor — прозрачное, научно ориентированное приложение, которое работает строго в пределах аппаратных возможностей iPhone.',
              'PPG-камера → пульс и метрики ВСР.',
              'Датчики движения → дыхательные и респираторные тесты.',
              'Тесты с понятной логикой, подсказками и проверками безопасности.',
              'Если сигнал плохой, измерение отклоняется — а не превращается в красивое число.',
              'Без подписок. Без рекламы. Без аккаунтов. Без сбора данных. Локальная обработка.',
              'Важно: приложение не лечит и не диагностирует медицинские состояния.',
              'Какие обещания в приложениях для здоровья раздражают вас больше всего — и почему?'
            ],
            summaryLabel: 'Читать полный пост'
          },
          links: [
            { label: 'Политика приватности', href: 'https://privacy.easyai.org.kz', external: true },
            { label: 'Instagram', href: 'https://www.instagram.com/no_subs_apps', external: true }
          ]
        }
      ]
    },
    manifesto: {
      kicker: 'Манифест',
      title: 'Мы объявляем конец эпохи подписок.',
      intro: 'Мы — no_subs_apps. Мы строим экосистему мобильных приложений с фиксированными правилами.',
      bullets: ['0 платных подписок', '0 рекламы', '0 встроенных покупок', '0 сбора данных', '0 нежелательных уведомлений'],
      paragraphs: [
        'Это не промоакция. Это наша политика. Навсегда.',
        'У наших приложений нет серверов. Мы не идентифицируем пользователей. Мы не видим ваши фотографии. Мы не храним ваши документы. Всё, что вы делаете в приложении, остаётся только на вашем устройстве.',
        'Ваши данные принадлежат вам. Не нам. Не рекламодателям.',
        'Бесплатно не значит дёшево. Мы перфекционисты. Мы стремимся делать приложения более мощными и удобными, чем платные альтернативы. Мы создаём продукты, которыми хотим пользоваться сами.',
        'Почему мы это делаем? Потому что цифровой мир должен быть честным.',
        'Пользуйтесь. Делитесь с теми, кого любите. Будьте свободны.'
      ],
      summaryLabel: 'Читать полный манифест'
    },
    story: {
      kicker: 'Наша история',
      title: 'Не корпорация. Семья.',
      intro: 'Мы Иван и Ксения. Мы не корпорация. Мы семья.',
      paragraphs: [
        'Несколько лет назад нашу жизнь обнулило. В 2022 году мы переехали в Казахстан и начали с нуля. Иван похудел на 20 кг из-за стресса и нехватки денег, работал за 6 долларов в день, жил в хостеле и ночами учился программировать.',
        'Самым тяжёлым испытанием стала болезнь Ксении — рак. В такие периоды всё меняется: время, силы и деньги начинают иметь совсем другой вес.',
        'Тогда началась самая практичная часть. Мы стали делать небольшие сайты для себя: чтобы вести учёт, быстрее ориентироваться в задачах, не держать всё в голове и не зависеть от чужих сервисов.',
        'Мы пытались найти альтернативы и снова и снова упирались в одно и то же: либо дорого, либо вечная подписка, либо платный доступ на каждом шаге, либо странные требования и лишние разрешения. Когда приоритеты становятся бескомпромиссными, хочется платить только за то, без чего правда нельзя обойтись, и не терпеть навязчивость в базовых вещах.',
        'В какой-то момент стало ясно: проще и честнее сделать самим — ровно так, как нам нужно. Без продажи внимания. Без “разблокируйте эту функцию”. Без трекинга. Без сбора данных. Просто продукт, который работает.',
        'Так появился no_subs_apps — портфель приложений с фиксированными правилами: без подписок, без рекламы, без встроенных покупок, без сбора данных. Всё работает локально на устройстве, без аккаунтов. Каждое приложение выходит с полной функциональностью и локализацией на 15 языков.',
        'Честно говоря, разработка стала нашим способом держаться. Когда вокруг тяжело, работа над продуктом возвращает ясность: дизайн, логика, дисциплина, ощущение контроля. Мы умеем делать продукты аккуратно и внимательно и не хотим от этого отказываться.',
        'Мы собираем опыт из разных сфер и превращаем его в приложения, которые, на наш взгляд, сделаны честно. Если это помогает людям, значит всё было не зря. Сейчас у нас десятки идей и большая цель: доказать, что можно строить сильные продукты и оставаться людьми.',
        'Если вам близок этот подход, вы можете поддержать нас по ссылке в профиле. Это совсем не обязательно, но даёт нам силы продолжать.'
      ],
      summaryLabel: 'Читать полную историю'
    },
    roadmap: {
      kicker: 'Роадмап',
      title: '50+ iOS-приложений, одна неизменная политика.',
      lead: 'Мы строим портфель NoSubsApps: более 50 iOS-приложений в разных категориях, которые решают реальные задачи без подписок, рекламы, встроенных покупок и сбора данных.',
      cards: [
        {
          title: 'Как мы разрабатываем и выпускаем',
          items: [
            'Мы выпускаем приложения по одному: сначала доводим приложение до стабильности, потом переходим дальше.',
            'Мы улучшаем уже выпущенные приложения: исправления, оптимизация, UX и обратная связь пользователей.',
            'Мы работаем полный день только над NoSubsApps, чтобы поддерживать уже выпущенное и выпускать новое.'
          ]
        },
        {
          title: 'Как предложить идею',
          items: [
            'Напишите, что это за приложение.',
            'Объясните, зачем оно вам: “я делаю X, мне нужно Y”.',
            'Пришлите три обязательные функции, без которых приложение не имеет смысла.',
            'Если есть платная альтернатива, назовите её и в одном-двух предложениях напишите, что в ней раздражает.'
          ]
        },
        {
          title: 'Как мы выбираем следующее',
          items: [
            'Мы ставим в очередь идеи, которые чаще всего повторяются и закрывают понятную регулярную боль.',
            'Мы отдаём приоритет задачам, которые можно сделать полностью офлайн и качественно на iOS.',
            'Также можно писать нам с улучшениями, багами и новыми функциями для уже выпущенных приложений.'
          ]
        }
      ]
    },
    contact: {
      kicker: 'Контакты',
      title: 'Присылайте идеи приложений, баги и честную обратную связь.',
      lead: 'Пишите в Instagram Direct или на почту. Лучшее сообщение объясняет задачу, сценарий использования и конкретную функцию, которая сделает инструмент полезным.',
      cards: [
        { label: 'Email', value: 'NoSubsApps@gmail.com', href: 'mailto:NoSubsApps@gmail.com', action: 'Скопировать' },
        { label: 'Instagram', value: '@no_subs_apps', href: 'https://www.instagram.com/no_subs_apps', external: true, action: 'Открыть профиль' },
        { label: 'Политики приватности', value: 'privacy.easyai.org.kz', href: 'https://privacy.easyai.org.kz', external: true, action: 'Открыть' }
      ]
    },
    footer: {
      legal: 'NoSubsApps — продуктовый бренд, под которым действует Индивидуальный предприниматель EasyAI.',
      privacy: 'Политики приватности'
    },
    ui: {
      readLess: 'Свернуть',
      copied: 'Скопировано',
      copyFailed: 'Скопируйте вручную',
      backToTop: 'Наверх',
      external: 'откроется в новой вкладке'
    }
  }
};
