/*
  HOW TO ADD A NEW APP
  1. Put the new image into assets/images/.
  2. Copy the object below and paste it after the last app.
  3. Change only the fields inside that object.
  4. Do not edit index.html or styles.css to add an app. The carousel is rendered automatically.
*/
window.NSA_APPS = [
  {
    id: 'pulse-monitor',
    image: 'assets/images/pulse-card.jpg',
    icon: 'assets/images/pulse-icon.png',
    appStoreUrl: '',
    instagramUrl: 'https://www.instagram.com/no_subs_apps',
    privacyUrl: 'https://privacy.easyai.org.kz',
    en: {
      title: 'Pulse Monitor',
      category: 'Health, recovery, breathing',
      imageAlt: 'Pulse Monitor artwork with a unicorn doctor and a purple fish',
      text: 'Pulse, HRV, breathing, and recovery — using only iPhone sensors, with strict signal-quality checks and export.',
      post: [
        'The App Store is full of apps promising “camera-based blood pressure” or “clinical-grade oxygen,” with ads sometimes even suggesting you “toss your blood pressure monitor.” It sounds flashy. But it is a dangerous logic: selling people confidence that simply is not there.',
        'We took a different approach. Pulse Monitor is a transparent, science-minded app that works strictly within the hardware realities of the iPhone.',
        'PPG camera → heart rate and HRV metrics.',
        'Motion sensors → breathing and respiratory tests.',
        'Tests with clear logic, guidance, and safety checks.',
        'If the signal is poor, the measurement is rejected — not twisted into a pretty number.',
        'No subscriptions. No ads. No accounts. No data collection. Local processing.',
        'Important: this app does not treat or diagnose medical conditions.',
        'Which promises in health apps irritate you the most — and why?'
      ]
    },
    ru: {
      title: 'Pulse Monitor',
      category: 'Здоровье, восстановление, дыхание',
      imageAlt: 'Обложка Pulse Monitor с единорогом-доктором и фиолетовой рыбой',
      text: 'Пульс, ВСР, дыхание и восстановление — только датчики iPhone, жёсткая проверка качества сигнала и экспорт.',
      post: [
        'В App Store полно приложений, которые обещают “измерение давления камерой” или “клиническую сатурацию”, а реклама иногда предлагает чуть ли не выбросить тонометр. Это выглядит ярко, но логика опасная: продавать людям уверенность, которой на самом деле нет.',
        'Мы выбрали другой подход. Pulse Monitor — прозрачное, научно ориентированное приложение, которое работает строго в пределах аппаратных возможностей iPhone.',
        'PPG-камера → пульс и метрики ВСР.',
        'Датчики движения → дыхательные и респираторные тесты.',
        'Тесты с понятной логикой, подсказками и проверками безопасности.',
        'Если сигнал плохой, измерение отклоняется — а не превращается в красивое число.',
        'Без подписок. Без рекламы. Без аккаунтов. Без сбора данных. Локальная обработка.',
        'Важно: приложение не лечит и не диагностирует медицинские состояния.',
        'Какие обещания в приложениях для здоровья раздражают вас больше всего — и почему?'
      ]
    }
  }
];
