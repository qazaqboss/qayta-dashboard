document.addEventListener('DOMContentLoaded', () => {
    // Navigation handling
    const navItems = document.querySelectorAll('.nav-item');
    const viewContainer = document.getElementById('view-container');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // View switching
            switchToView(view);
        });
    });

    function switchToView(view) {
        // Update Sidebar Active State
        navItems.forEach(nav => {
            if (nav.getAttribute('data-view') === view) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });

        // Toggle visibility
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        const targetView = document.getElementById(`${view}-view`);
        
        if (targetView) {
            targetView.classList.add('active');
            // Hide dashboard if it's not the target
            if (view !== 'dashboard') {
               document.getElementById('dashboard-view').classList.remove('active');
            }
        } else {
            renderPlaceholderView(view);
        }

        // Specific view initializers
        if (view === 'orders') renderOrdersTable();
        if (view === 'analytics') renderAnalytics();
        if (view === 'team') renderTeam();
        if (view === 'citizen-app') renderCitizenApp();
        if (view === 'driver-app') renderDriverApp();
    }

    const mockOrders = [
        {id: '#Q-45832', object: 'ЖК "Алма-Сити"', type: 'Бетон', volume: '3.5 м³', status: 'completed', date: '15.03.2026'},
        {id: '#Q-45834', object: 'ТРЦ "Мега"', type: 'Металл', volume: '1.2 м³', status: 'progress', date: '16.03.2026'},
        {id: '#Q-45835', object: 'БЦ "Олимп"', type: 'Мебель', volume: '0.8 м³', status: 'pending', date: '16.03.2026'},
        {id: '#Q-45836', object: 'ЖК "Нурия"', type: 'Кирпич', volume: '2.0 м³', status: 'completed', date: '14.03.2026'},
        {id: '#Q-45837', object: 'Офис ТОО "ABC"', type: 'Бумага', volume: '0.5 м³', status: 'progress', date: '16.03.2026'},
        {id: '#Q-45838', object: 'ЖК "Хайвилл"', type: 'Дерево', volume: '1.5 м³', status: 'completed', date: '13.03.2026'},
        {id: '#Q-45839', object: 'Экспо-центр', type: 'Пластик', volume: '0.4 м³', status: 'pending', date: '17.03.2026'},
        {id: '#Q-45840', object: 'ЖК "Зеленый Квартал"', type: 'Грунт', volume: '5.0 м³', status: 'completed', date: '12.03.2026'},
        {id: '#Q-45841', object: 'ТРЦ "Хан Шатыр"', type: 'Стекло', volume: '0.3 м³', status: 'progress', date: '16.03.2026'},
        {id: '#Q-45842', object: 'ЖК "Ордабасы"', type: 'Арматура', volume: '0.9 м³', status: 'completed', date: '11.03.2026'}
    ];

    function renderOrdersTable() {
        const table = document.getElementById('full-orders-table');
        if (!table) return;
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Дата</th>
                    <th>Объект</th>
                    <th>Тип</th>
                    <th>Объем</th>
                    <th>Статус</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
                ${mockOrders.map(o => `
                    <tr>
                        <td>${o.id}</td>
                        <td>${o.date}</td>
                        <td>${o.object}</td>
                        <td>${o.type}</td>
                        <td>${o.volume}</td>
                        <td><span class="status-badge ${o.status}">${translateStatus(o.status)}</span></td>
                        <td>
                            <button class="btn-icon ${o.status === 'completed' ? 'btn-view-cert' : ''}" title="Просмотр">
                                <span class="material-symbols-rounded">${o.status === 'completed' ? 'verified' : 'visibility'}</span>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        // Re-attach cert modal listeners
        document.querySelectorAll('.btn-view-cert').forEach(btn => {
            btn.onclick = () => document.getElementById('certModal').style.display = 'block';
        });
    }

    function translateStatus(s) {
        const t = { 'completed': 'Выполнен', 'progress': 'В пути', 'pending': 'Ожидание' };
        return t[s] || s;
    }

    function renderAnalytics() {
        const volumeChart = document.getElementById('waste-volume-chart');
        const pieChart = document.getElementById('waste-pie-chart');
        if (!volumeChart || !pieChart) return;

        // Render Bar Chart for Volume
        volumeChart.innerHTML = `
            <svg viewBox="0 0 800 200" style="width: 100%; height: 100%;">
                <rect x="50" y="150" width="40" height="30" fill="var(--primary-light)" rx="4"/>
                <rect x="110" y="120" width="40" height="60" fill="var(--primary-light)" rx="4"/>
                <rect x="170" y="100" width="40" height="80" fill="var(--primary-light)" rx="4"/>
                <rect x="230" y="60" width="40" height="120" fill="var(--primary)" rx="4"/>
                <rect x="290" y="80" width="40" height="100" fill="var(--primary-light)" rx="4"/>
                <rect x="350" y="40" width="40" height="140" fill="var(--primary)" rx="4"/>
                <rect x="410" y="90" width="40" height="90" fill="var(--primary-light)" rx="4"/>
                <text x="50" y="195" font-size="10" fill="var(--text-muted)">Пн</text>
                <text x="110" y="195" font-size="10" fill="var(--text-muted)">Вт</text>
                <text x="170" y="195" font-size="10" fill="var(--text-muted)">Ср</text>
                <text x="230" y="195" font-size="10" fill="var(--text-muted)">Чт</text>
                <text x="290" y="195" font-size="10" fill="var(--text-muted)">Пт</text>
                <text x="350" y="195" font-size="10" fill="var(--text-muted)">Сб</text>
                <text x="410" y="195" font-size="10" fill="var(--text-muted)">Вс</text>
            </svg>
        `;

        // Render Donut Chart for Categories
        pieChart.innerHTML = `
            <svg viewBox="0 0 200 200" style="width: 100%; height: 180px;">
                <circle cx="100" cy="100" r="70" fill="none" stroke="#F1F5F9" stroke-width="20"/>
                <circle cx="100" cy="100" r="70" fill="none" stroke="var(--primary)" stroke-width="20" stroke-dasharray="300 440" stroke-dashoffset="0" transform="rotate(-90 100 100)"/>
                <circle cx="100" cy="100" r="70" fill="none" stroke="#3498DB" stroke-width="20" stroke-dasharray="100 440" stroke-dashoffset="-300" transform="rotate(-90 100 100)"/>
                <circle cx="100" cy="100" r="70" fill="none" stroke="#9B59B6" stroke-width="20" stroke-dasharray="40 440" stroke-dashoffset="-400" transform="rotate(-90 100 100)"/>
                <text x="100" y="105" text-anchor="middle" font-weight="700" font-size="20">65%</text>
                <text x="100" y="125" text-anchor="middle" font-size="10" fill="var(--text-muted)">Строймусор</text>
            </svg>
        `;
    }

    function renderTeam() {
        const container = document.getElementById('team-list');
        if (!container) return;
        const members = [
            {name: 'Almas Muratov', role: 'Старший Прораб', initial: 'AM', email: 'almas@stroycom.kz', phone: '+7 701 123 44 55'},
            {name: 'Saule Kanat', role: 'Бухгалтер', initial: 'SK', email: 'saule@stroycom.kz', phone: '+7 777 555 11 22'},
            {name: 'Daulet T.', role: 'Администратор', initial: 'DT', email: 'admin@stroycom.kz', phone: '+7 705 999 88 77'},
            {name: 'Igor V.', role: 'Прораб Объекта', initial: 'IV', email: 'igor@stroycom.kz', phone: '+7 747 333 22 11'}
        ];
        container.innerHTML = members.map(m => `
            <div class="team-card">
                <div class="team-avatar">${m.initial}</div>
                <div class="team-info">
                    <strong>${m.name}</strong>
                    <div style="font-size: 12px; color: var(--text-muted)">${m.role}</div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${m.email}</div>
                </div>
                <button class="btn-icon" style="margin-left: auto"><span class="material-symbols-rounded">more_vert</span></button>
            </div>
        `).join('') + `
            <div class="team-card" style="border-style: dashed; justify-content: center; cursor: pointer; color: var(--primary); background: transparent;">
                <span class="material-symbols-rounded">add</span> Добавить сотрудника
            </div>
        `;
    }

    function renderCitizenApp() {
        const screen = document.getElementById('citizen-screen');
        screen.innerHTML = `
            <div class="m-header"><span class="m-logo">Qayta</span></div>
            <div class="m-content">
                <h3 style="margin-bottom: 16px;">Что вывозим?</h3>
                <div class="m-order-type">
                    <div class="m-item selected"><span class="material-symbols-rounded">construction</span><br>Строймусор</div>
                    <div class="m-item"><span class="material-symbols-rounded">chair</span><br>Мебель</div>
                    <div class="m-item"><span class="material-symbols-rounded">tv</span><br>Электроника</div>
                    <div class="m-item"><span class="material-symbols-rounded">more_horiz</span><br>Другое</div>
                </div>
                <div class="m-card" style="margin-top: 20px;">
                    <div style="font-size: 12px; color: var(--text-muted)">Ваш адрес</div>
                    <strong>пр. Абая, 12, кв. 45</strong>
                </div>
                <div class="m-card">
                    <div style="display: flex; justify-content: space-between;">
                        <span>Итоговая цена:</span>
                        <strong>~8,500 ₸</strong>
                    </div>
                </div>
                <button class="m-btn">Заказать вывоз</button>
            </div>
            <div class="m-footer">
                <span class="material-symbols-rounded" style="color: var(--primary)">home</span>
                <span class="material-symbols-rounded">history</span>
                <span class="material-symbols-rounded">person</span>
            </div>
        `;
    }

    function renderDriverApp() {
        const screen = document.getElementById('driver-screen');
        screen.innerHTML = `
            <div class="m-header" style="background: var(--secondary); color: white;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>DRIVER</strong>
                    <div class="status-badge" style="background: var(--primary); color: white; border: none;">В СЕТИ</div>
                </div>
            </div>
            <div class="m-content" style="background: #e2e8f0; display: flex; flex-direction: column; justify-content: flex-end;">
                <div class="m-card" style="margin-bottom: 0; border-radius: 20px 20px 0 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <strong>Новый заказ!</strong>
                        <span style="color: var(--primary); font-weight: 700;">+6,800 ₸</span>
                    </div>
                    <div style="font-size: 13px; margin-bottom: 16px;">
                        <span class="material-symbols-rounded" style="font-size: 14px; vertical-align: middle;">location_on</span>
                        мкр. Жетысу, 12 (3.2 км)
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button class="m-btn" style="background: #eee; color: #333;">Пропустить</button>
                        <button class="m-btn">Принять</button>
                    </div>
                </div>
            </div>
             <div class="m-footer">
                <span class="material-symbols-rounded" style="color: var(--primary)">map</span>
                <span class="material-symbols-rounded">account_balance_wallet</span>
                <span class="material-symbols-rounded">settings</span>
            </div>
        `;
    }

    function renderPlaceholderView(name) {
        // Hide dashboard
        document.getElementById('dashboard-view').style.display = 'none';
        
        // Remove existing placeholders
        const placeholders = document.querySelectorAll('.placeholder-view');
        placeholders.forEach(p => p.remove());
        
        // Create new placeholder
        const div = document.createElement('section');
        div.className = 'placeholder-view view active';
        div.innerHTML = `
            <div class="view-header">
                <h1>${getViewTitle(name)}</h1>
                <p>Этот раздел находится в разработке для прототипа.</p>
            </div>
            <div class="empty-state">
                <span class="material-symbols-rounded" style="font-size: 64px; color: var(--text-muted);">construction</span>
                <p>Данный модуль будет реализован в следующей версии.</p>
            </div>
        `;
        viewContainer.appendChild(div);
    }

    function getViewTitle(name) {
        const titles = {
            'dashboard': 'Дашборд',
            'orders': 'Мои заказы',
            'analytics': 'Аналитика',
            'team': 'Сотрудники',
            'settings': 'Настройки',
            'citizen-app': 'Приложение Жителя',
            'driver-app': 'Приложение Водителя'
        };
        return titles[name] || name;
    }

    // Modal Handling
    const modal = document.getElementById('orderModal');
    const certModal = document.getElementById('certModal');
    const btn = document.getElementById('newOrderBtn');
    const closeBtns = document.querySelectorAll('.close');

    btn.onclick = () => modal.style.display = 'block';
    
    closeBtns.forEach(c => {
        c.onclick = () => {
            modal.style.display = 'none';
            certModal.style.display = 'none';
        }
    });

    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
        if (event.target == certModal) certModal.style.display = 'none';
    };

    // Table actions
    document.querySelectorAll('.btn-view-cert').forEach(btn => {
        btn.onclick = () => {
            certModal.style.display = 'block';
        }
    });

    // Form submission simulation
    const form = document.getElementById('newOrderForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button');
        submitBtn.innerHTML = 'Создание...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            modal.style.display = 'none';
            alert('Заявка успешно создана! Водитель будет назначен в ближайшее время.');
            submitBtn.innerHTML = 'Создать заявку';
            submitBtn.disabled = false;
            form.reset();
        }, 1500);
    };

    // Dashboard "View All" link
    const viewAllLink = document.querySelector('.view-all');
    if (viewAllLink) {
        viewAllLink.onclick = (e) => {
            e.preventDefault();
            switchToView('orders');
        };
    }

    // Notification interaction
    const notifications = document.querySelector('.notifications');
    notifications.onclick = () => {
        alert('У вас нет новых уведомлений.');
        document.querySelector('.notification-badge').style.display = 'none';
    };
});
