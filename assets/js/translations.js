(function translationsModule() {
  const fallbackLang = 'es';

  const translations = {
    es: {
      meta: {
        title: 'Bolsi | Gastos y presupuesto sin complicaciones',
        description: 'Bolsi es la app más amigable para controlar gastos, compartir presupuestos y ahorrar cada mes.'
      },
      common: {
        skipLink: 'Saltar al contenido principal'
      },
      brand: {
        tagline: 'Gastos y presupuesto sin complicaciones'
      },
      users: '10+ descargas reales en Google Play',
      groups: 'Clasificación oficial: Apto para todo público',
      rating: 'Última actualización: 14 nov 2025',
      nav: {
        why: 'Por qué elegirnos',
        features: 'Funciones',
        audience: 'Para quién',
        faq: 'FAQs',
        download: 'Descargar'
      },
      hero: {
        eyebrow: 'Finanzas claras, decisiones inteligentes',
        title: 'Bolsi: Gastos y presupuesto sin complicaciones',
        description: '¿Cansado de no saber a dónde se va tu dinero? Con Bolsi registras gastos en segundos, compartes con quien quieras y ves alertas antes de pasarte.',
        ctaPrimary: 'Descargar en Google Play',
        ctaSecondary: 'Ver video demo',
        trust: 'Disponible para Android. Sincroniza en tiempo real.',
        statLabel: 'Alertas inteligentes',
        statValue: '+30% más ahorro',
        statCaption: 'Con recordatorios diarios y reportes semanales'
      },
      benefits: {
        eyebrow: 'Primero, los beneficios',
        heading: '¿Por qué Bolsi es tu aliado perfecto?',
        subheading: 'Te ayudamos a usar la app todos los días con una experiencia realmente amigable.',
        cards: [
          {
            title: 'SÚPER FÁCIL DE USAR',
            description: 'Registra un gasto en menos de 10 segundos. Diseñada para usarla a diario sin esfuerzo.'
          },
          {
            title: 'GASTOS COMPARTIDOS, SIN DRAMAS',
            description: 'Crea grupos familiares, de pareja o roommates y sincroniza todo en tiempo real.'
          },
          {
            title: 'PRESUPUESTOS QUE FUNCIONAN',
            description: 'Define límites por categoría y recibe alertas tipo semáforo antes de pasarte.'
          },
          {
            title: 'PRIVADO Y 100% SEGURO',
            description: 'Tus datos están cifrados con Firebase. Solo tú decides quién ve tus finanzas.'
          }
        ]
      },
      features: {
        eyebrow: 'Tus finanzas, claras como el agua',
        heading: 'Todo lo que necesitas en una app amigable',
        subheading: 'Controla gastos fijos y variables, ve estadísticas visuales y mantén la calma ante cualquier pago.',
        list: [
          'Control Total: registra gastos fijos y variables con etiquetas inteligentes.',
          'Estadísticas Visuales: gráficos claros para detectar fugas de dinero.',
          'Grupos Ilimitados: ideal para la casa, viajes o proyectos colaborativos.',
          'Soporte Multimoneda: USD, EUR, ARS, MXN, COP y más sin conversiones manuales.',
          'Historial Completo: edita, elimina y consulta cada movimiento en segundos.'
        ],
        metrics: {
          users: '10+ descargas reales en Google Play',
          groups: 'Clasificación oficial: Apto para todo público',
          rating: 'Última actualización: 14 nov 2025'
        },
        metricsDynamic: {
          users: 'Instalaciones verificadas: {{value}}',
          rating: 'Calificación promedio: {{value}}',
          updated: 'Última actualización: {{value}}'
        },
        cards: {
          title: 'Tarjetas de Crédito',
          description: 'Registra compras en cuotas, visualiza tu deuda total y gestiona múltiples tarjetas desde un panel unificado.'
        },
        multiCurrency: {
          title: 'Multi-moneda',
          description: 'Soporta USD, EUR, MXN, ARS, COP, BRL y más. Perfecto para viajeros o quienes manejan diferentes divisas.'
        },
        alerts: {
          title: 'Alertas Inteligentes',
          description: 'Recibe notificaciones cuando te acerques al límite de tus gastos o vencimientos de pagos importantes.'
        },
        darkMode: {
          title: 'Modo Oscuro',
          description: 'Cuida tus ojos con nuestro elegante modo oscuro. Cambia entre claro y oscuro con un toque.'
        },
        reports: {
          title: 'Reportes Visuales',
          description: 'Gráficos de pastel, barras y líneas para entender tus patrones de gasto. Exporta reportes cuando lo necesites.'
        },
        security: {
          title: 'Seguridad Firebase',
          description: 'Tu información protegida con la infraestructura de Google. Respaldo automático y encriptación de datos.'
        }
      },
      howItWorks: {
        eyebrow: 'Muy fácil de usar',
        heading: 'Controla tus gastos en 3 pasos',
        subheading: 'Configurar tu control de gastos es tan simple que empezarás en menos de 2 minutos.',
        step1: {
          title: 'Crea tus gastos fijos',
          description: 'Define tus gastos mensuales como alquiler, servicios, suscripciones. Bolsi los recordará automáticamente.'
        },
        step2: {
          title: 'Registra tus movimientos',
          description: 'Añade compras y pagos del día a día. Con pocos toques, mantén todo actualizado en tiempo real.'
        },
        step3: {
          title: 'Ve tu situación real',
          description: 'Revisa cuánto te queda disponible, gráficos por categoría y alertas inteligentes para no pasarte de presupuesto.'
        },
        bonus: {
          title: 'Comparte con tu familia',
          description: 'Crea grupos para gestionar gastos compartidos. Perfecto para parejas, familias o roommates que dividen gastos.'
        }
      },
      faq: {
        eyebrow: 'Preguntas frecuentes',
        heading: 'Resolvemos tus dudas en segundos',
        subheading: 'Bolsi está diseñada para acompañarte sin curvas de aprendizaje.',
        items: [
          {
            question: '¿Necesito ser experto en finanzas?',
            answer: 'No. Bolsi guía cada paso con textos claros, notificaciones y plantillas listas.'
          },
          {
            question: '¿Funciona en varios países?',
            answer: 'Sí. Soporta múltiples monedas, contextos personales o grupales y se sincroniza en la nube.'
          }
        ]
      },
      audience: {
        eyebrow: 'Foco en tus metas',
        heading: 'Bolsi es perfecto para ti si...',
        subheading: 'Sin importar si ahorras solo, en pareja o en familia, Bolsi se adapta a tu ritmo.',
        beginners: {
          title: 'Principiantes en finanzas',
          description: '¿Quieres empezar a ahorrar pero no sabes por dónde? Bolsi te guía paso a paso sin tecnicismos.'
        },
        families: {
          title: 'Familias y parejas',
          description: 'Compartes gastos con pareja, familia o roomies? Sincroniza todo en tiempo real sin complicaciones.'
        },
        students: {
          title: 'Estudiantes y freelancers',
          description: 'Presupuesto ajustado? Controla cada peso con una app que respeta tu tiempo y tu bolsillo.'
        },
        power: {
          title: 'Usuarios exigentes',
          description: '¿Harto de apps complicadas? Bolsi es velocidad pura: registra gastos en menos de 10 segundos.'
        },
        highlight: '¡Descarga Bolsi hoy y haz las paces con tu dinero!',
        ctaButton: 'Descargar Gratis'
      },
      cta: {
        eyebrow: 'Empieza gratis',
        heading: 'Haz las paces con tu dinero',
        subheading: 'Instala Bolsi y controla cada peso, dólar o real desde el celular.',
        primary: 'Descargar en Google Play',
        secondary: 'Recibir novedades',
        footnote: 'Gratis para Android. Sin costo inicial.'
      },
      footer: {
        rights: '© 2025 Bolsi. Todos los derechos reservados.',
        privacy: 'Política de privacidad',
        deleteAccount: 'Eliminar cuenta',
        terms: 'Términos de uso',
        contact: 'Contacto'
      },
      privacy: {
        navbar: {
          back: 'Volver al Inicio'
        },
        hero: {
          title: 'Política de Privacidad',
          lastUpdated: 'Última actualización:',
          date: '15 de noviembre de 2025'
        },
        section1: {
          title: '1. Introducción',
          p1: 'Bienvenido a <strong>Bolsi</strong>. Esta aplicación es desarrollada y mantenida por Altrion Tech ("nosotros", "nuestro" o "nos"). Nos comprometemos a proteger tu privacidad y a ser transparentes sobre cómo recopilamos, usamos y protegemos tu información personal.',
          p2: 'Esta Política de Privacidad explica qué información recopilamos, cómo la usamos, con quién la compartimos y cuáles son tus derechos respecto a tu información personal.',
          important: '<strong>Importante:</strong> Al usar Bolsi, aceptas los términos descritos en esta Política de Privacidad. Si no estás de acuerdo, por favor no uses la aplicación.'
        },
        section2: {
          title: '2. Información que Recopilamos',
          subtitle1: '2.1 Información que Proporcionas',
          item1: '<strong>Cuenta de Usuario:</strong> Dirección de correo electrónico y contraseña cuando te registras',
          item2: '<strong>Datos Financieros:</strong> Información sobre tus gastos, pagos fijos, movimientos financieros, títulos de gastos, montos y monedas',
          item3: '<strong>Datos de Grupos:</strong> Información sobre grupos que creas o a los que te unes para compartir gastos',
          item4: '<strong>Preferencias:</strong> Configuraciones de la aplicación, preferencias de visualización de gráficas',
          subtitle2: '2.2 Información que Recopilamos Automáticamente',
          item5: '<strong>Información del Dispositivo:</strong> Tipo de dispositivo, sistema operativo, identificadores únicos',
          item6: '<strong>Datos de Uso:</strong> Cómo interactúas con la aplicación, funciones utilizadas, frecuencia de uso',
          item7: '<strong>Información de Errores:</strong> Reportes de crashes y errores para mejorar la estabilidad de la app',
          item8: '<strong>Datos de Publicidad:</strong> Interacciones con anuncios mostrados en la aplicación',
          subtitle3: '2.3 Información que NO Recopilamos',
          item9: 'NO recopilamos información de tarjetas de crédito o débito',
          item10: 'NO accedemos a tu información bancaria real',
          item11: 'NO recopilamos datos de menores de 13 años intencionalmente',
          item12: 'NO rastreamos tu ubicación GPS'
        },
        section3: {
          title: '3. Cómo Usamos tu Información',
          intro: 'Utilizamos la información recopilada para:',
          item1: '<strong>Proporcionar el Servicio:</strong> Permitirte usar todas las funcionalidades de la app',
          item2: '<strong>Sincronización:</strong> Mantener tus datos sincronizados entre tus dispositivos',
          item3: '<strong>Personalización:</strong> Adaptar la experiencia según tus preferencias',
          item4: '<strong>Mejoras:</strong> Analizar el uso para mejorar funcionalidades y rendimiento',
          item5: '<strong>Soporte:</strong> Responder a tus consultas y resolver problemas técnicos',
          item6: '<strong>Seguridad:</strong> Detectar y prevenir fraudes o usos indebidos',
          item7: '<strong>Comunicaciones:</strong> Enviarte notificaciones importantes sobre la app'
        },
        section4: {
          title: '4. Compartir Información',
          intro: '<strong>NO vendemos ni alquilamos tu información personal a terceros.</strong>',
          p1: 'Podemos compartir información limitada con:',
          item1: '<strong>Firebase (Google):</strong> Para almacenamiento de datos y autenticación',
          item2: '<strong>Google AdMob:</strong> Para mostrar publicidad relevante (solo en versión gratuita)',
          item3: '<strong>Proveedores de Servicios:</strong> Que nos ayudan a operar y mejorar la app',
          item4: '<strong>Cumplimiento Legal:</strong> Si es requerido por ley o para proteger nuestros derechos'
        },
        section5: {
          title: '5. Seguridad de los Datos',
          intro: 'Implementamos múltiples medidas de seguridad:',
          item1: '<strong>Encriptación:</strong> Todos los datos se transmiten mediante HTTPS',
          item2: '<strong>Firebase Security Rules:</strong> Restricciones de acceso a nivel de base de datos',
          item3: '<strong>Autenticación Segura:</strong> Contraseñas hasheadas, nunca almacenadas en texto plano',
          item4: '<strong>Actualizaciones Regulares:</strong> Parches de seguridad aplicados constantemente',
          note: '<strong>Nota de Seguridad:</strong> Aunque implementamos las mejores prácticas de seguridad, ningún sistema es 100% seguro. Te recomendamos usar contraseñas fuertes y únicas.'
        },
        section6: {
          title: '6. Tus Derechos',
          intro: 'Tienes derecho a:',
          item1: '<strong>Acceder:</strong> Solicitar una copia de tus datos personales',
          item2: '<strong>Rectificar:</strong> Corregir información inexacta o incompleta',
          item3: '<strong>Eliminar:</strong> Solicitar la eliminación de tu cuenta y datos',
          item4: '<strong>Exportar:</strong> Descargar tus datos en formato portable (función Premium)',
          item5: '<strong>Oponerte:</strong> Rechazar ciertos usos de tu información',
          item6: '<strong>Limitar:</strong> Restringir el procesamiento de tus datos'
        },
        section7: {
          title: '7. Retención de Datos',
          intro: 'Conservamos tu información mientras:',
          item1: 'Tu cuenta esté activa',
          item2: 'Sea necesario para proporcionar el servicio',
          item3: 'Tengamos obligaciones legales de retención',
          item4: 'Sea necesario para resolver disputas',
          p1: 'Cuando eliminas tu cuenta, la mayoría de los datos se eliminan en 30 días. Algunos datos pueden conservarse por requisitos legales o fiscales (hasta 7 años para transacciones de pago).'
        },
        section8: {
          title: '8. Servicios de Terceros',
          intro: 'Políticas de privacidad de servicios utilizados:'
        },
        section9: {
          title: '9. Menores de Edad',
          intro: '<strong>Bolsi NO está dirigida a menores de 13 años.</strong>',
          item1: 'No recopilamos intencionalmente información de niños menores de 13 años',
          item2: 'Si descubrimos que hemos recopilado información de un menor de 13 años, la eliminaremos inmediatamente',
          item3: 'Si eres padre/madre/tutor y crees que tu hijo nos ha proporcionado información, contáctanos'
        },
        section10: {
          title: '10. Actualizaciones de esta Política',
          intro: 'Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios significativos mediante:',
          item1: 'Notificación dentro de la aplicación',
          item2: 'Correo electrónico (si lo has proporcionado)',
          item3: 'Actualización de la fecha "Última actualización" en la parte superior'
        },
        section11: {
          title: '11. Contacto',
          intro: 'Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el tratamiento de tus datos personales, contáctanos:',
          developer: 'Desarrollador:',
          app: 'Aplicación:',
          email: 'Email:',
          response: 'Tiempo de Respuesta:',
          responseText: 'Nos comprometemos a responder a tus consultas en un plazo de 7 días hábiles.'
        },
        footer: {
          version: 'Versión:',
          effective: 'Fecha de Vigencia:',
          effectiveDate: '15 de noviembre de 2025'
        }
      },
      delete: {
        navbar: {
          back: 'Volver al Inicio'
        },
        hero: {
          title: 'Eliminar Cuenta',
          subtitle: 'Información sobre cómo eliminar tu cuenta y datos personales'
        },
        section1: {
          title: '<i class="fas fa-exclamation-triangle"></i> Advertencia Importante',
          alert: 'La eliminación de tu cuenta es <strong>permanente e irreversible</strong>. Todos tus datos serán eliminados definitivamente y no podrán ser recuperados. Por favor, asegúrate de exportar cualquier información que desees conservar antes de proceder.'
        },
        section2: {
          title: '<i class="fas fa-lock"></i> Cómo Eliminar tu Cuenta',
          option1Title: 'Opción 1: Desde la Aplicación (Recomendado)',
          step1: 'Abre la app <strong>Bolsi</strong>',
          step2: 'Ve a <strong>Configuración</strong> (ícono de engranaje)',
          step3: 'Desplázate hasta la sección <strong>"Cuenta"</strong>',
          step4: 'Toca en <strong>"Eliminar Cuenta"</strong>',
          step5: 'Lee la advertencia y confirma tu decisión',
          step6: 'Ingresa tu contraseña para verificación',
          step7: 'Toca <strong>"Eliminar Permanentemente"</strong>',
          option2Title: 'Opción 2: Por Email',
          option2Intro: 'Si no puedes acceder a la aplicación o prefieres eliminar tu cuenta por correo electrónico, envíanos un email con la siguiente información:',
          emailButton: 'Enviar Solicitud de Eliminación',
          emailInfoTitle: '<i class="fas fa-info-circle"></i> Información Necesaria para la Solicitud por Email',
          emailInfo1: 'Email registrado en tu cuenta de Bolsi',
          emailInfo2: 'Confirmación de que entiendes que la eliminación es permanente',
          emailInfo3: 'Razón de la eliminación (opcional pero nos ayuda a mejorar)'
        },
        section3: {
          title: '<i class="fas fa-trash-alt"></i> Datos que se Eliminarán',
          intro: 'Al eliminar tu cuenta, la siguiente información será eliminada permanentemente:',
          item1: '<i class="fas fa-check"></i> Cuenta de Usuario:',
          item1desc: 'Email, contraseña y perfil',
          item2: '<i class="fas fa-check"></i> Datos Financieros:',
          item2desc: 'Todos los gastos, pagos fijos y movimientos registrados',
          item3: '<i class="fas fa-check"></i> Grupos/Contextos:',
          item3desc: 'Todos los grupos que hayas creado y sus datos asociados',
          item4: '<i class="fas fa-check"></i> Configuraciones:',
          item4desc: 'Todas tus preferencias y configuraciones de la app',
          item5: '<i class="fas fa-check"></i> Historial de Sincronización:',
          item5desc: 'Todos los datos almacenados en nuestros servidores'
        },
        section4: {
          title: '<i class="fas fa-chart-bar"></i> Datos que se Conservarán (Si Aplica)',
          legalTitle: '<i class="fas fa-info-circle"></i> Información Legal y Financiera',
          legalIntro: 'Por razones legales, fiscales y de auditoría, podemos conservar ciertos datos durante períodos específicos:',
          retention1: '• Historial de Transacciones de Pago:',
          retention1desc: 'Conservado por <strong>7 años</strong> (requisito legal fiscal)',
          retention2: '• Registros de Suscripción Premium:',
          retention2desc: 'Conservado por <strong>90 días</strong> después de la eliminación (para resolver disputas de pago)',
          retention3: '• Datos Agregados y Anonimizados:',
          retention3desc: 'Pueden conservarse indefinidamente para análisis estadísticos (sin información personal identificable)',
          retention4: '• Logs de Seguridad:',
          retention4desc: 'Conservados por <strong>6 meses</strong> (para prevenir fraude y abuso)',
          note: 'Nota: Estos datos conservados están en formato cifrado y no son accesibles ni visibles para ti ni para otros usuarios. Se utilizan únicamente para cumplir con obligaciones legales.'
        },
        section5: {
          title: '<i class="fas fa-clock"></i> Plazos de Eliminación',
          timeline1: 'Eliminación Inmediata (0-24 horas):',
          timeline1desc: 'Cuenta de usuario, acceso a la app, datos visibles',
          timeline2: 'Eliminación de Servidores (1-30 días):',
          timeline2desc: 'Datos almacenados en Firebase y backups',
          timeline3: 'Datos de Terceros (30-90 días):',
          timeline3desc: 'Datos en servicios de Google (AdMob, Play Billing) según sus políticas'
        },
        section6: {
          title: '<i class="fas fa-question-circle"></i> Preguntas Frecuentes',
          q1: '¿Puedo recuperar mi cuenta después de eliminarla?',
          a1: 'No. La eliminación es permanente. Si deseas volver a usar la app, deberás crear una nueva cuenta desde cero.',
          q2: '¿Se cancelará automáticamente mi suscripción Premium?',
          a2: 'Debes cancelar tu suscripción Premium manualmente desde Google Play Store antes de eliminar tu cuenta. La eliminación de la cuenta no cancela automáticamente suscripciones activas.',
          q3: '¿Qué pasa si tengo grupos compartidos con otros usuarios?',
          a3: 'Solo se eliminarán tus datos personales. Los grupos compartidos seguirán existiendo para los demás usuarios, pero tu información se eliminará de ellos.',
          q4: '¿Cuánto tiempo tarda el proceso?',
          a4: 'El acceso a tu cuenta se bloquea inmediatamente. La eliminación completa de todos los datos de nuestros servidores puede tardar hasta 30 días.'
        },
        section7: {
          title: '<i class="fas fa-phone-alt"></i> ¿Necesitas Ayuda?',
          contactTitle: 'Contacto y Soporte',
          contactIntro: 'Si tienes preguntas o problemas durante el proceso de eliminación, contáctanos:',
          email: 'Email:',
          app: 'App:',
          developer: 'Desarrollador:',
          responseTime: 'Tiempo de respuesta:',
          responseTimeValue: '24-48 horas hábiles'
        },
        footer: {
          lastUpdated: 'Última actualización:',
          date: '15 de noviembre de 2025'
        }
      }
    },
    en: {
      meta: {
        title: 'Bolsi | Friendly budgeting for everyday people',
        description: 'Track expenses, share budgets and save money every month with Bolsi.'
      },
      common: {
        skipLink: 'Skip to main content'
      },
      brand: {
        tagline: 'Smart money tracking'
      },
      nav: {
        why: 'Why Bolsi',
        features: 'Features',
        audience: 'For whom',
        faq: 'FAQs',
        download: 'Download'
      },
      hero: {
        eyebrow: 'Clear finances, smarter moves',
        title: 'Bolsi: friendly budgeting without the stress',
        description: 'Tired of messy spreadsheets? Bolsi lets you log expenses in seconds, share with anyone and stay on budget with gentle alerts.',
        ctaPrimary: 'Get on Google Play',
        ctaSecondary: 'Watch demo',
        trust: 'Available on Android. Syncs instantly.',
        statLabel: 'Smart alerts',
        statValue: '+30% more savings',
        statCaption: 'Daily reminders + weekly reports'
      },
      benefits: {
        eyebrow: 'Benefits first',
        heading: 'Why Bolsi is your perfect money buddy',
        subheading: 'We deliver value before features so you keep using it every day.',
        cards: [
          {
            title: 'SUPER EASY TO USE',
            description: 'Log any expense in under 10 seconds. Built for everyday routines.'
          },
          {
            title: 'SHARED EXPENSES, ZERO DRAMA',
            description: 'Create family, couple or roommate groups with real-time sync.'
          },
          {
            title: 'BUDGETS THAT WORK',
            description: 'Color-coded alerts tell you when you are close to each limit.'
          },
          {
            title: 'PRIVATE & SECURE',
            description: 'Firebase-grade encryption keeps every transaction safe.'
          }
        ]
      },
      features: {
        eyebrow: 'Your money, crystal clear',
        heading: 'Everything you need in one friendly app',
        subheading: 'Track recurring bills, daily coffee and every transfer with visual insights.',
        list: [
          'Total control: fixed + variable expenses with smart tags.',
          'Visual stats: charts that reveal where money leaks.',
          'Unlimited groups: perfect for trips, home or side projects.',
          'Multi-currency: USD, EUR, ARS, MXN, COP and more without manual math.',
          'Full history: edit, delete or filter every move in seconds.'
        ],
        metrics: {
          users: '10+ verified installs on Google Play',
          groups: 'Content rating: Everyone',
          rating: 'Last update: Nov 14, 2025'
        },
        metricsDynamic: {
          users: 'Verified installs: {{value}}',
          rating: 'Average rating: {{value}}',
          updated: 'Last update: {{value}}'
        },
        cards: {
          title: 'Credit Cards',
          description: 'Track installment purchases, visualize total debt and manage multiple cards from a unified dashboard.'
        },
        multiCurrency: {
          title: 'Multi-currency',
          description: 'Supports USD, EUR, MXN, ARS, COP, BRL and more. Perfect for travelers or those handling different currencies.'
        },
        alerts: {
          title: 'Smart Alerts',
          description: 'Get notifications when you approach your spending limit or important payment due dates.'
        },
        darkMode: {
          title: 'Dark Mode',
          description: 'Protect your eyes with our elegant dark mode. Switch between light and dark with one tap.'
        },
        reports: {
          title: 'Visual Reports',
          description: 'Pie, bar and line charts to understand your spending patterns. Export reports when needed.'
        },
        security: {
          title: 'Firebase Security',
          description: 'Your data protected by Google infrastructure. Automatic backup and data encryption.'
        }
      },
      howItWorks: {
        eyebrow: 'Super easy to use',
        heading: 'Control your expenses in 3 steps',
        subheading: 'Setting up your expense tracking is so simple you\'ll start in less than 2 minutes.',
        step1: {
          title: 'Create your fixed expenses',
          description: 'Define your monthly expenses like rent, utilities, subscriptions. Bolsi will remember them automatically.'
        },
        step2: {
          title: 'Record your movements',
          description: 'Add daily purchases and payments. With just a few taps, keep everything updated in real-time.'
        },
        step3: {
          title: 'See your real situation',
          description: 'Check how much you have available, charts by category and smart alerts to avoid going over budget.'
        },
        bonus: {
          title: 'Share with your family',
          description: 'Create groups to manage shared expenses. Perfect for couples, families or roommates splitting costs.'
        }
      },
      faq: {
        eyebrow: 'FAQ',
        heading: 'Answers in plain language',
        subheading: 'Bolsi guides you step by step with no finance degree required.',
        items: [
          {
            question: 'Do I need finance experience?',
            answer: 'No. Bolsi explains every step with clear copy and ready-made templates.'
          },
          {
            question: 'Is it available worldwide?',
            answer: 'Yes. Multiple currencies, personal or group contexts and cloud sync.'
          }
        ]
      },
      audience: {
        eyebrow: 'Focus on your goals',
        heading: 'Bolsi is perfect if you...',
        subheading: 'Whether you save solo, with a partner or family, Bolsi adapts to you.',
        beginners: {
          title: 'Finance beginners',
          description: 'Want to start saving but don\'t know where to begin? Bolsi guides you step by step without jargon.'
        },
        families: {
          title: 'Families & couples',
          description: 'Share expenses with your partner, family or roommates? Sync everything in real-time without hassle.'
        },
        students: {
          title: 'Students & freelancers',
          description: 'Tight budget? Control every penny with an app that respects your time and wallet.'
        },
        power: {
          title: 'Power users',
          description: 'Tired of complicated apps? Bolsi is pure speed: log expenses in under 10 seconds.'
        },
        highlight: 'Download Bolsi today and make peace with your money!',
        ctaButton: 'Download Free'
      },
      cta: {
        eyebrow: 'Start for free',
        heading: 'Make peace with your money',
        subheading: 'Install Bolsi and control every peso, dollar or real from your phone.',
        primary: 'Get on Google Play',
        secondary: 'Get product updates',
        footnote: 'Free for Android. No upfront cost.'
      },
      footer: {
        rights: '© 2025 Bolsi. All rights reserved.',
        privacy: 'Privacy policy',
        deleteAccount: 'Delete account',
        terms: 'Terms of use',
        contact: 'Contact'
      },
      privacy: {
        navbar: {
          back: 'Back to Home'
        },
        hero: {
          title: 'Privacy Policy',
          lastUpdated: 'Last Updated:',
          date: 'November 15, 2025'
        },
        section1: {
          title: '1. Introduction',
          p1: 'Welcome to <strong>Bolsi</strong>. This application is developed and maintained by Altrion Tech ("we", "our" or "us"). We are committed to protecting your privacy and being transparent about how we collect, use and protect your personal information.',
          p2: 'This Privacy Policy explains what information we collect, how we use it, who we share it with and what your rights are regarding your personal information.',
          important: '<strong>Important:</strong> By using Bolsi, you accept the terms described in this Privacy Policy. If you do not agree, please do not use the application.'
        },
        section2: {
          title: '2. Information We Collect',
          subtitle1: '2.1 Information You Provide',
          item1: '<strong>User Account:</strong> Email address and password when you register',
          item2: '<strong>Financial Data:</strong> Information about your expenses, fixed payments, financial movements, expense titles, amounts and currencies',
          item3: '<strong>Group Data:</strong> Information about groups you create or join to share expenses',
          item4: '<strong>Preferences:</strong> App settings, chart display preferences',
          subtitle2: '2.2 Information We Collect Automatically',
          item5: '<strong>Device Information:</strong> Device type, operating system, unique identifiers',
          item6: '<strong>Usage Data:</strong> How you interact with the app, features used, frequency of use',
          item7: '<strong>Error Information:</strong> Crash reports and errors to improve app stability',
          item8: '<strong>Advertising Data:</strong> Interactions with ads displayed in the application',
          subtitle3: '2.3 Information We DO NOT Collect',
          item9: 'We DO NOT collect credit or debit card information',
          item10: 'We DO NOT access your real banking information',
          item11: 'We DO NOT intentionally collect data from children under 13',
          item12: 'We DO NOT track your GPS location'
        },
        section3: {
          title: '3. How We Use Your Information',
          intro: 'We use the collected information to:',
          item1: '<strong>Provide the Service:</strong> Allow you to use all app functionalities',
          item2: '<strong>Synchronization:</strong> Keep your data synced across your devices',
          item3: '<strong>Personalization:</strong> Adapt the experience according to your preferences',
          item4: '<strong>Improvements:</strong> Analyze usage to improve features and performance',
          item5: '<strong>Support:</strong> Respond to your inquiries and resolve technical issues',
          item6: '<strong>Security:</strong> Detect and prevent fraud or misuse',
          item7: '<strong>Communications:</strong> Send you important notifications about the app'
        },
        section4: {
          title: '4. Sharing Information',
          intro: '<strong>We DO NOT sell or rent your personal information to third parties.</strong>',
          p1: 'We may share limited information with:',
          item1: '<strong>Firebase (Google):</strong> For data storage and authentication',
          item2: '<strong>Google AdMob:</strong> To display relevant advertising (free version only)',
          item3: '<strong>Service Providers:</strong> Who help us operate and improve the app',
          item4: '<strong>Legal Compliance:</strong> If required by law or to protect our rights'
        },
        section5: {
          title: '5. Data Security',
          intro: 'We implement multiple security measures:',
          item1: '<strong>Encryption:</strong> All data is transmitted via HTTPS',
          item2: '<strong>Firebase Security Rules:</strong> Database-level access restrictions',
          item3: '<strong>Secure Authentication:</strong> Hashed passwords, never stored in plain text',
          item4: '<strong>Regular Updates:</strong> Security patches applied constantly',
          note: '<strong>Security Note:</strong> Although we implement best security practices, no system is 100% secure. We recommend using strong and unique passwords.'
        },
        section6: {
          title: '6. Your Rights',
          intro: 'You have the right to:',
          item1: '<strong>Access:</strong> Request a copy of your personal data',
          item2: '<strong>Rectify:</strong> Correct inaccurate or incomplete information',
          item3: '<strong>Delete:</strong> Request deletion of your account and data',
          item4: '<strong>Export:</strong> Download your data in portable format (Premium feature)',
          item5: '<strong>Object:</strong> Refuse certain uses of your information',
          item6: '<strong>Limit:</strong> Restrict processing of your data'
        },
        section7: {
          title: '7. Data Retention',
          intro: 'We retain your information while:',
          item1: 'Your account is active',
          item2: 'It is necessary to provide the service',
          item3: 'We have legal retention obligations',
          item4: 'It is necessary to resolve disputes',
          p1: 'When you delete your account, most data is deleted within 30 days. Some data may be retained for legal or tax requirements (up to 7 years for payment transactions).'
        },
        section8: {
          title: '8. Third-Party Services',
          intro: 'Privacy policies of services used:'
        },
        section9: {
          title: '9. Minors',
          intro: '<strong>Bolsi is NOT directed at children under 13 years old.</strong>',
          item1: 'We do not intentionally collect information from children under 13',
          item2: 'If we discover we have collected information from a minor under 13, we will delete it immediately',
          item3: 'If you are a parent/guardian and believe your child has provided us with information, contact us'
        },
        section10: {
          title: '10. Updates to this Policy',
          intro: 'We may update this Privacy Policy occasionally. We will notify you of significant changes through:',
          item1: 'In-app notification',
          item2: 'Email (if you have provided it)',
          item3: 'Update of the "Last Updated" date at the top'
        },
        section11: {
          title: '11. Contact',
          intro: 'If you have questions, concerns or requests related to this Privacy Policy or the processing of your personal data, contact us:',
          developer: 'Developer:',
          app: 'Application:',
          email: 'Email:',
          response: 'Response Time:',
          responseText: 'We are committed to responding to your inquiries within 7 business days.'
        },
        footer: {
          version: 'Version:',
          effective: 'Effective Date:',
          effectiveDate: 'November 15, 2025'
        }
      },
      delete: {
        navbar: {
          back: 'Back to Home'
        },
        hero: {
          title: 'Delete Account',
          subtitle: 'Information on how to delete your account and personal data'
        },
        section1: {
          title: '<i class="fas fa-exclamation-triangle"></i> Important Warning',
          alert: 'Deleting your account is <strong>permanent and irreversible</strong>. All your data will be permanently deleted and cannot be recovered. Please make sure to export any information you wish to keep before proceeding.'
        },
        section2: {
          title: '<i class="fas fa-lock"></i> How to Delete Your Account',
          option1Title: 'Option 1: From the App (Recommended)',
          step1: 'Open the <strong>Bolsi</strong> app',
          step2: 'Go to <strong>Settings</strong> (gear icon)',
          step3: 'Scroll down to the <strong>"Account"</strong> section',
          step4: 'Tap on <strong>"Delete Account"</strong>',
          step5: 'Read the warning and confirm your decision',
          step6: 'Enter your password for verification',
          step7: 'Tap <strong>"Delete Permanently"</strong>',
          option2Title: 'Option 2: By Email',
          option2Intro: 'If you cannot access the app or prefer to delete your account via email, send us an email with the following information:',
          emailButton: 'Send Deletion Request',
          emailInfoTitle: '<i class="fas fa-info-circle"></i> Information Needed for Email Request',
          emailInfo1: 'Email registered in your Bolsi account',
          emailInfo2: 'Confirmation that you understand the deletion is permanent',
          emailInfo3: 'Reason for deletion (optional but helps us improve)'
        },
        section3: {
          title: '<i class="fas fa-trash-alt"></i> Data That Will Be Deleted',
          intro: 'When you delete your account, the following information will be permanently deleted:',
          item1: '<i class="fas fa-check"></i> User Account:',
          item1desc: 'Email, password and profile',
          item2: '<i class="fas fa-check"></i> Financial Data:',
          item2desc: 'All expenses, fixed payments and recorded transactions',
          item3: '<i class="fas fa-check"></i> Groups/Contexts:',
          item3desc: 'All groups you have created and their associated data',
          item4: '<i class="fas fa-check"></i> Settings:',
          item4desc: 'All your preferences and app settings',
          item5: '<i class="fas fa-check"></i> Synchronization History:',
          item5desc: 'All data stored on our servers'
        },
        section4: {
          title: '<i class="fas fa-chart-bar"></i> Data That Will Be Retained (If Applicable)',
          legalTitle: '<i class="fas fa-info-circle"></i> Legal and Financial Information',
          legalIntro: 'For legal, tax and audit reasons, we may retain certain data for specific periods:',
          retention1: '• Payment Transaction History:',
          retention1desc: 'Retained for <strong>7 years</strong> (legal tax requirement)',
          retention2: '• Premium Subscription Records:',
          retention2desc: 'Retained for <strong>90 days</strong> after deletion (to resolve payment disputes)',
          retention3: '• Aggregated and Anonymized Data:',
          retention3desc: 'May be retained indefinitely for statistical analysis (no personally identifiable information)',
          retention4: '• Security Logs:',
          retention4desc: 'Retained for <strong>6 months</strong> (to prevent fraud and abuse)',
          note: 'Note: This retained data is in encrypted format and is not accessible or visible to you or other users. It is used solely to comply with legal obligations.'
        },
        section5: {
          title: '<i class="fas fa-clock"></i> Deletion Timelines',
          timeline1: 'Immediate Deletion (0-24 hours):',
          timeline1desc: 'User account, app access, visible data',
          timeline2: 'Server Deletion (1-30 days):',
          timeline2desc: 'Data stored on Firebase and backups',
          timeline3: 'Third-Party Data (30-90 days):',
          timeline3desc: 'Data in Google services (AdMob, Play Billing) according to their policies'
        },
        section6: {
          title: '<i class="fas fa-question-circle"></i> Frequently Asked Questions',
          q1: 'Can I recover my account after deleting it?',
          a1: 'No. Deletion is permanent. If you want to use the app again, you will need to create a new account from scratch.',
          q2: 'Will my Premium subscription be automatically canceled?',
          a2: 'You must manually cancel your Premium subscription from the Google Play Store before deleting your account. Account deletion does not automatically cancel active subscriptions.',
          q3: 'What happens if I have groups shared with other users?',
          a3: 'Only your personal data will be deleted. Shared groups will continue to exist for other users, but your information will be removed from them.',
          q4: 'How long does the process take?',
          a4: 'Access to your account is blocked immediately. Complete deletion of all data from our servers can take up to 30 days.'
        },
        section7: {
          title: '<i class="fas fa-phone-alt"></i> Need Help?',
          contactTitle: 'Contact and Support',
          contactIntro: 'If you have questions or problems during the deletion process, contact us:',
          email: 'Email:',
          app: 'App:',
          developer: 'Developer:',
          responseTime: 'Response time:',
          responseTimeValue: '24-48 business hours'
        },
        footer: {
          lastUpdated: 'Last updated:',
          date: 'November 15, 2025'
        }
      }
    },
    pt: {
      meta: {
        title: 'Bolsi | Gastos e orçamento sem complicações',
        description: 'Controle despesas, compartilhe orçamentos e economize todo mês com Bolsi.'
      },
      common: {
        skipLink: 'Ir para o conteúdo principal'
      },
      brand: {
        tagline: 'Finanças inteligentes'
      },
      nav: {
        why: 'Por que escolher',
        features: 'Recursos',
        audience: 'Para quem',
        faq: 'Dúvidas',
        download: 'Baixar'
      },
      hero: {
        eyebrow: 'Finanças claras, decisões inteligentes',
        title: 'Bolsi: orçamento amigável para o dia a dia',
        description: 'Chega de planilhas confusas. Com Bolsi você registra gastos em segundos, divide com quem quiser e recebe alertas antes de estourar o orçamento.',
        ctaPrimary: 'Baixar no Google Play',
        ctaSecondary: 'Ver demo',
        trust: 'Disponível para Android com sincronização imediata.',
        statLabel: 'Alertas inteligentes',
        statValue: '+30% mais economia',
        statCaption: 'Lembretes diários + relatórios semanais'
      },
      benefits: {
        eyebrow: 'Benefícios primeiro',
        heading: 'Por que Bolsi é seu aliado perfeito?',
        subheading: 'Mostramos o valor antes dos recursos para você usar todos os dias.',
        cards: [
          {
            title: 'SUPER FÁCIL DE USAR',
            description: 'Registre qualquer gasto em menos de 10 segundos. Feito para a rotina.'
          },
          {
            title: 'DESPESAS COMPARTILHADAS, SEM DRAMA',
            description: 'Crie grupos para família, casal ou amigos com sincronização em tempo real.'
          },
          {
            title: 'ORÇAMENTOS QUE FUNCIONAM',
            description: 'Alertas com cores mostram quando você está perto do limite.'
          },
          {
            title: 'PRIVADO E 100% SEGURO',
            description: 'Dados criptografados com Firebase. Só você decide quem vê.'
          }
        ]
      },
      features: {
        eyebrow: 'Suas finanças, cristalinas',
        heading: 'Tudo o que você precisa em um app amigável',
        subheading: 'Controle contas fixas, gastos variáveis e veja insights visuais que fazem sentido.',
        list: [
          'Controle total: despesas fixas e variáveis com etiquetas inteligentes.',
          'Estatísticas visuais: gráficos que mostram para onde o dinheiro vai.',
          'Grupos ilimitados: perfeito para casa, viagens ou projetos.',
          'Multi-moeda: USD, EUR, BRL, ARS, MXN e mais sem cálculos manuais.',
          'Histórico completo: edite, exclua ou filtre qualquer movimento em segundos.'
        ],
        metrics: {
          users: '10+ instalações verificadas no Google Play',
          groups: 'Classificação: Livre para todos',
          rating: 'Última atualização: 14 nov 2025'
        },
        metricsDynamic: {
          users: 'Instalações verificadas: {{value}}',
          rating: 'Avaliação média: {{value}}',
          updated: 'Última atualização: {{value}}'
        },
        cards: {
          title: 'Cartões de Crédito',
          description: 'Registre compras parceladas, visualize sua dívida total e gerencie vários cartões de um painel unificado.'
        },
        multiCurrency: {
          title: 'Multi-moeda',
          description: 'Suporta USD, EUR, MXN, ARS, COP, BRL e mais. Perfeito para viajantes ou quem lida com diferentes moedas.'
        },
        alerts: {
          title: 'Alertas Inteligentes',
          description: 'Receba notificações quando se aproximar do limite de gastos ou vencimentos de pagamentos importantes.'
        },
        darkMode: {
          title: 'Modo Escuro',
          description: 'Proteja seus olhos com nosso elegante modo escuro. Alterne entre claro e escuro com um toque.'
        },
        reports: {
          title: 'Relatórios Visuais',
          description: 'Gráficos de pizza, barras e linhas para entender seus padrões de gastos. Exporte relatórios quando precisar.'
        },
        security: {
          title: 'Segurança Firebase',
          description: 'Seus dados protegidos pela infraestrutura do Google. Backup automático e criptografia de dados.'
        }
      },
      howItWorks: {
        eyebrow: 'Muito fácil de usar',
        heading: 'Controle seus gastos em 3 passos',
        subheading: 'Configurar seu controle de gastos é tão simples que você começa em menos de 2 minutos.',
        step1: {
          title: 'Crie suas despesas fixas',
          description: 'Defina seus gastos mensais como aluguel, serviços, assinaturas. Bolsi vai lembrar automaticamente.'
        },
        step2: {
          title: 'Registre seus movimentos',
          description: 'Adicione compras e pagamentos do dia a dia. Com poucos toques, mantenha tudo atualizado em tempo real.'
        },
        step3: {
          title: 'Veja sua situação real',
          description: 'Verifique quanto você tem disponível, gráficos por categoria e alertas inteligentes para não estourar o orçamento.'
        },
        bonus: {
          title: 'Compartilhe com sua família',
          description: 'Crie grupos para gerenciar despesas compartilhadas. Perfeito para casais, famílias ou colegas de quarto que dividem custos.'
        }
      },
      faq: {
        eyebrow: 'Dúvidas frequentes',
        heading: 'Respondemos rapidinho',
        subheading: 'Bolsi guia cada etapa sem exigir conhecimento financeiro.',
        items: [
          {
            question: 'Preciso entender de finanças?',
            answer: 'Não. Bolsi traz textos claros, lembretes inteligentes e modelos prontos.'
          },
          {
            question: 'Funciona em vários países?',
            answer: 'Sim. Multi-moeda, contextos pessoais ou em grupo e nuvem segura.'
          }
        ]
      },
      audience: {
        eyebrow: 'Foque nas metas',
        heading: 'Bolsi é perfeito se você...',
        subheading: 'Seja para economizar sozinho, em casal ou família, Bolsi acompanha você.',
        beginners: {
          title: 'Iniciantes em finanças',
          description: 'Quer começar a economizar mas não sabe por onde? Bolsi te guia passo a passo sem jargões.'
        },
        families: {
          title: 'Famílias e casais',
          description: 'Divide despesas com parceiro, família ou amigos? Sincronize tudo em tempo real sem complicações.'
        },
        students: {
          title: 'Estudantes e freelancers',
          description: 'Orçamento apertado? Controle cada centavo com um app que respeita seu tempo e bolso.'
        },
        power: {
          title: 'Usuários exigentes',
          description: 'Cansou de apps complicados? Bolsi é velocidade pura: registre gastos em menos de 10 segundos.'
        },
        highlight: 'Baixe o Bolsi hoje e faça as pazes com o seu dinheiro!',
        ctaButton: 'Baixar Grátis'
      },
      cta: {
        eyebrow: 'Comece grátis',
        heading: 'Faça as pazes com seu dinheiro',
        subheading: 'Instale Bolsi e controle cada gasto direto do celular.',
        primary: 'Baixar no Google Play',
        secondary: 'Receber novidades',
        footnote: 'Grátis para Android. Sem custo inicial.'
      },
      footer: {
        rights: '© 2025 Bolsi. Todos os direitos reservados.',
        privacy: 'Política de privacidade',
        deleteAccount: 'Excluir conta',
        terms: 'Termos de uso',
        contact: 'Contato'
      },
      privacy: {
        navbar: {
          back: 'Voltar ao Início'
        },
        hero: {
          title: 'Política de Privacidade',
          lastUpdated: 'Última Atualização:',
          date: '15 de novembro de 2025'
        },
        section1: {
          title: '1. Introdução',
          p1: 'Bem-vindo ao <strong>Bolsi</strong>. Esta aplicação é desenvolvida e mantida pela Altrion Tech ("nós", "nosso" ou "nos"). Estamos comprometidos em proteger sua privacidade e ser transparentes sobre como coletamos, usamos e protegemos suas informações pessoais.',
          p2: 'Esta Política de Privacidade explica quais informações coletamos, como as usamos, com quem as compartilhamos e quais são seus direitos em relação às suas informações pessoais.',
          important: '<strong>Importante:</strong> Ao usar o Bolsi, você aceita os termos descritos nesta Política de Privacidade. Se não concordar, por favor não use a aplicação.'
        },
        section2: {
          title: '2. Informações que Coletamos',
          subtitle1: '2.1 Informações que Você Fornece',
          item1: '<strong>Conta de Usuário:</strong> Endereço de email e senha quando você se registra',
          item2: '<strong>Dados Financeiros:</strong> Informações sobre seus gastos, pagamentos fixos, movimentos financeiros, títulos de gastos, valores e moedas',
          item3: '<strong>Dados de Grupos:</strong> Informações sobre grupos que você cria ou aos quais se junta para compartilhar despesas',
          item4: '<strong>Preferências:</strong> Configurações do aplicativo, preferências de visualização de gráficos',
          subtitle2: '2.2 Informações que Coletamos Automaticamente',
          item5: '<strong>Informações do Dispositivo:</strong> Tipo de dispositivo, sistema operacional, identificadores únicos',
          item6: '<strong>Dados de Uso:</strong> Como você interage com o aplicativo, recursos utilizados, frequência de uso',
          item7: '<strong>Informações de Erros:</strong> Relatórios de crashes e erros para melhorar a estabilidade do app',
          item8: '<strong>Dados de Publicidade:</strong> Interações com anúncios exibidos no aplicativo',
          subtitle3: '2.3 Informações que NÃO Coletamos',
          item9: 'NÃO coletamos informações de cartões de crédito ou débito',
          item10: 'NÃO acessamos suas informações bancárias reais',
          item11: 'NÃO coletamos intencionalmente dados de menores de 13 anos',
          item12: 'NÃO rastreamos sua localização GPS'
        },
        section3: {
          title: '3. Como Usamos suas Informações',
          intro: 'Utilizamos as informações coletadas para:',
          item1: '<strong>Fornecer o Serviço:</strong> Permitir que você use todas as funcionalidades do app',
          item2: '<strong>Sincronização:</strong> Manter seus dados sincronizados entre seus dispositivos',
          item3: '<strong>Personalização:</strong> Adaptar a experiência de acordo com suas preferências',
          item4: '<strong>Melhorias:</strong> Analisar o uso para melhorar funcionalidades e desempenho',
          item5: '<strong>Suporte:</strong> Responder às suas consultas e resolver problemas técnicos',
          item6: '<strong>Segurança:</strong> Detectar e prevenir fraudes ou usos indevidos',
          item7: '<strong>Comunicações:</strong> Enviar notificações importantes sobre o app'
        },
        section4: {
          title: '4. Compartilhamento de Informações',
          intro: '<strong>NÃO vendemos nem alugamos suas informações pessoais a terceiros.</strong>',
          p1: 'Podemos compartilhar informações limitadas com:',
          item1: '<strong>Firebase (Google):</strong> Para armazenamento de dados e autenticação',
          item2: '<strong>Google AdMob:</strong> Para exibir publicidade relevante (apenas na versão gratuita)',
          item3: '<strong>Provedores de Serviços:</strong> Que nos ajudam a operar e melhorar o app',
          item4: '<strong>Cumprimento Legal:</strong> Se exigido por lei ou para proteger nossos direitos'
        },
        section5: {
          title: '5. Segurança dos Dados',
          intro: 'Implementamos múltiplas medidas de segurança:',
          item1: '<strong>Criptografia:</strong> Todos os dados são transmitidos via HTTPS',
          item2: '<strong>Firebase Security Rules:</strong> Restrições de acesso em nível de banco de dados',
          item3: '<strong>Autenticação Segura:</strong> Senhas hash, nunca armazenadas em texto simples',
          item4: '<strong>Atualizações Regulares:</strong> Patches de segurança aplicados constantemente',
          note: '<strong>Nota de Segurança:</strong> Embora implementemos as melhores práticas de segurança, nenhum sistema é 100% seguro. Recomendamos usar senhas fortes e únicas.'
        },
        section6: {
          title: '6. Seus Direitos',
          intro: 'Você tem o direito de:',
          item1: '<strong>Acessar:</strong> Solicitar uma cópia de seus dados pessoais',
          item2: '<strong>Retificar:</strong> Corrigir informações incorretas ou incompletas',
          item3: '<strong>Excluir:</strong> Solicitar a exclusão de sua conta e dados',
          item4: '<strong>Exportar:</strong> Baixar seus dados em formato portável (recurso Premium)',
          item5: '<strong>Opor-se:</strong> Recusar certos usos de suas informações',
          item6: '<strong>Limitar:</strong> Restringir o processamento de seus dados'
        },
        section7: {
          title: '7. Retenção de Dados',
          intro: 'Conservamos suas informações enquanto:',
          item1: 'Sua conta estiver ativa',
          item2: 'For necessário para fornecer o serviço',
          item3: 'Tivermos obrigações legais de retenção',
          item4: 'For necessário para resolver disputas',
          p1: 'Quando você exclui sua conta, a maioria dos dados é excluída em 30 dias. Alguns dados podem ser conservados por requisitos legais ou fiscais (até 7 anos para transações de pagamento).'
        },
        section8: {
          title: '8. Serviços de Terceiros',
          intro: 'Políticas de privacidade dos serviços utilizados:'
        },
        section9: {
          title: '9. Menores de Idade',
          intro: '<strong>Bolsi NÃO é direcionado a menores de 13 anos.</strong>',
          item1: 'Não coletamos intencionalmente informações de crianças menores de 13 anos',
          item2: 'Se descobrirmos que coletamos informações de um menor de 13 anos, as excluiremos imediatamente',
          item3: 'Se você é pai/mãe/tutor e acredita que seu filho nos forneceu informações, entre em contato'
        },
        section10: {
          title: '10. Atualizações desta Política',
          intro: 'Podemos atualizar esta Política de Privacidade ocasionalmente. Notificaremos você sobre mudanças significativas através de:',
          item1: 'Notificação dentro do aplicativo',
          item2: 'Email (se você o forneceu)',
          item3: 'Atualização da data "Última Atualização" no topo'
        },
        section11: {
          title: '11. Contato',
          intro: 'Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou ao tratamento de seus dados pessoais, entre em contato:',
          developer: 'Desenvolvedor:',
          app: 'Aplicação:',
          email: 'Email:',
          response: 'Tempo de Resposta:',
          responseText: 'Nos comprometemos a responder às suas consultas em um prazo de 7 dias úteis.'
        },
        footer: {
          version: 'Versão:',
          effective: 'Data de Vigência:',
          effectiveDate: '15 de novembro de 2025'
        }
      },
      delete: {
        navbar: {
          back: 'Voltar ao Início'
        },
        hero: {
          title: 'Excluir Conta',
          subtitle: 'Informações sobre como excluir sua conta e dados pessoais'
        },
        section1: {
          title: '<i class="fas fa-exclamation-triangle"></i> Aviso Importante',
          alert: 'A exclusão da sua conta é <strong>permanente e irreversível</strong>. Todos os seus dados serão excluídos definitivamente e não poderão ser recuperados. Por favor, certifique-se de exportar qualquer informação que deseje manter antes de prosseguir.'
        },
        section2: {
          title: '<i class="fas fa-lock"></i> Como Excluir Sua Conta',
          option1Title: 'Opção 1: Pelo Aplicativo (Recomendado)',
          step1: 'Abra o app <strong>Bolsi</strong>',
          step2: 'Vá para <strong>Configurações</strong> (ícone de engrenagem)',
          step3: 'Role até a seção <strong>"Conta"</strong>',
          step4: 'Toque em <strong>"Excluir Conta"</strong>',
          step5: 'Leia o aviso e confirme sua decisão',
          step6: 'Digite sua senha para verificação',
          step7: 'Toque em <strong>"Excluir Permanentemente"</strong>',
          option2Title: 'Opção 2: Por Email',
          option2Intro: 'Se você não conseguir acessar o aplicativo ou preferir excluir sua conta por email, envie-nos um email com as seguintes informações:',
          emailButton: 'Enviar Solicitação de Exclusão',
          emailInfoTitle: '<i class="fas fa-info-circle"></i> Informações Necessárias para Solicitação por Email',
          emailInfo1: 'Email registrado na sua conta Bolsi',
          emailInfo2: 'Confirmação de que você entende que a exclusão é permanente',
          emailInfo3: 'Motivo da exclusão (opcional mas nos ajuda a melhorar)'
        },
        section3: {
          title: '<i class="fas fa-trash-alt"></i> Dados que Serão Excluídos',
          intro: 'Ao excluir sua conta, as seguintes informações serão excluídas permanentemente:',
          item1: '<i class="fas fa-check"></i> Conta de Usuário:',
          item1desc: 'Email, senha e perfil',
          item2: '<i class="fas fa-check"></i> Dados Financeiros:',
          item2desc: 'Todas as despesas, pagamentos fixos e movimentos registrados',
          item3: '<i class="fas fa-check"></i> Grupos/Contextos:',
          item3desc: 'Todos os grupos que você criou e seus dados associados',
          item4: '<i class="fas fa-check"></i> Configurações:',
          item4desc: 'Todas as suas preferências e configurações do app',
          item5: '<i class="fas fa-check"></i> Histórico de Sincronização:',
          item5desc: 'Todos os dados armazenados em nossos servidores'
        },
        section4: {
          title: '<i class="fas fa-chart-bar"></i> Dados que Serão Mantidos (Se Aplicável)',
          legalTitle: '<i class="fas fa-info-circle"></i> Informação Legal e Financeira',
          legalIntro: 'Por razões legais, fiscais e de auditoria, podemos manter certos dados por períodos específicos:',
          retention1: '• Histórico de Transações de Pagamento:',
          retention1desc: 'Mantido por <strong>7 anos</strong> (requisito legal fiscal)',
          retention2: '• Registros de Assinatura Premium:',
          retention2desc: 'Mantido por <strong>90 dias</strong> após a exclusão (para resolver disputas de pagamento)',
          retention3: '• Dados Agregados e Anonimizados:',
          retention3desc: 'Podem ser mantidos indefinidamente para análises estatísticas (sem informações pessoais identificáveis)',
          retention4: '• Logs de Segurança:',
          retention4desc: 'Mantidos por <strong>6 meses</strong> (para prevenir fraude e abuso)',
          note: 'Nota: Esses dados mantidos estão em formato criptografado e não são acessíveis nem visíveis para você nem para outros usuários. São usados apenas para cumprir obrigações legais.'
        },
        section5: {
          title: '<i class="fas fa-clock"></i> Prazos de Exclusão',
          timeline1: 'Exclusão Imediata (0-24 horas):',
          timeline1desc: 'Conta de usuário, acesso ao app, dados visíveis',
          timeline2: 'Exclusão de Servidores (1-30 dias):',
          timeline2desc: 'Dados armazenados no Firebase e backups',
          timeline3: 'Dados de Terceiros (30-90 dias):',
          timeline3desc: 'Dados em serviços do Google (AdMob, Play Billing) conforme suas políticas'
        },
        section6: {
          title: '<i class="fas fa-question-circle"></i> Perguntas Frequentes',
          q1: 'Posso recuperar minha conta depois de excluí-la?',
          a1: 'Não. A exclusão é permanente. Se você quiser usar o app novamente, precisará criar uma nova conta do zero.',
          q2: 'Minha assinatura Premium será cancelada automaticamente?',
          a2: 'Você deve cancelar sua assinatura Premium manualmente na Google Play Store antes de excluir sua conta. A exclusão da conta não cancela automaticamente assinaturas ativas.',
          q3: 'O que acontece se eu tiver grupos compartilhados com outros usuários?',
          a3: 'Somente seus dados pessoais serão excluídos. Os grupos compartilhados continuarão existindo para outros usuários, mas suas informações serão removidas deles.',
          q4: 'Quanto tempo leva o processo?',
          a4: 'O acesso à sua conta é bloqueado imediatamente. A exclusão completa de todos os dados de nossos servidores pode levar até 30 dias.'
        },
        section7: {
          title: '<i class="fas fa-phone-alt"></i> Precisa de Ajuda?',
          contactTitle: 'Contato e Suporte',
          contactIntro: 'Se você tiver dúvidas ou problemas durante o processo de exclusão, entre em contato:',
          email: 'Email:',
          app: 'App:',
          developer: 'Desenvolvedor:',
          responseTime: 'Tempo de resposta:',
          responseTimeValue: '24-48 horas úteis'
        },
        footer: {
          lastUpdated: 'Última atualização:',
          date: '15 de novembro de 2025'
        }
      }
    }
  };

  const resolveValue = (source, path) => {
    if (!source || !path) return undefined;
    return path.split('.').reduce((acc, key) => {
      if (acc === undefined || acc === null) return undefined;
      if (Array.isArray(acc)) {
        const index = Number(key);
        return Number.isNaN(index) ? acc[key] : acc[index];
      }
      return acc[key];
    }, source);
  };

  const normalizeLangCode = (lang) => {
    if (!lang) return null;
    const value = lang.toLowerCase();
    if (value.startsWith('pt')) return 'pt';
    if (value.startsWith('en')) return 'en';
    if (value.startsWith('es')) return 'es';
    return null;
  };

  const getBrowserLanguagePreference = () => {
    const navigatorLangs = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || navigator.userLanguage].filter(Boolean);

    for (const lang of navigatorLangs) {
      const normalized = normalizeLangCode(lang);
      if (normalized && translations[normalized]) {
        return normalized;
      }
    }

    return null;
  };

  window.BolsiTranslations = {
    translations,
    fallbackLang,
    resolveValue,
    normalizeLangCode,
    getBrowserLanguagePreference
  };
})();
