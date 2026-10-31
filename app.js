/* Front-end demonstration only. Orders and messages are not sent to a server. */
const PRODUCTS = [
    {
        id: 'whey',
        name: 'Whey Protein',
        category: 'Protein',
        price: 499.99,
        image: 'Whey Protein.webp',
        description: 'A convenient protein blend for post-workout recovery.'
    },
    {
        id: 'blue-lab',
        name: 'Whey Blue Lab Protein',
        category: 'Protein',
        price: 599.99,
        image: 'Whey blue lab.jpg',
        description: 'Protein powder to support your training nutrition.'
    },
    {
        id: 'all-in-one',
        name: 'Whey All in One',
        category: 'Protein',
        price: 549.99,
        image: 'Whey(1).jpg',
        description: 'An all-in-one protein option for everyday use.'
    },
    {
        id: 'hyperbolic',
        name: 'Hyperbolic Mass',
        category: 'Protein',
        price: 699.99,
        image: 'Hyperbolic.jpg',
        description: 'A calorie dense shake for athletes with higher energy needs.'
    },
    {
        id: 'xts',
        name: 'Pre-Workout XTS',
        category: 'Pre-workout',
        price: 299.99,
        image: 'Pre-Workout XTS.webp',
        description: 'A pre-training blend for energy and focus.'
    },
    {
        id: 'platinum',
        name: 'Hyperdrive Platinum',
        category: 'Pre-workout',
        price: 249.99,
        image: 'hyperdrive platinum.jpg',
        description: 'A pre-workout option for training days.'
    },
    {
        id: 'qush',
        name: 'Qush',
        category: 'Pre-workout',
        price: 229.99,
        image: 'Qush.jpg',
        description: 'A portable pre-workout drink mix.'
    },
    {
        id: 'energy',
        name: 'Energy Drink',
        category: 'Pre-workout',
        price: 34.99,
        image: 'energy drink.jpg',
        description: 'A ready-to-drink energy option. Check the label for caffeine.'
    },
    {
        id: 'fast-growth',
        name: 'Fast Growth Aminos',
        category: 'Aminos',
        price: 219.99,
        image: 'Aminos (1).jpg',
        description: 'Amino acid supplement for your training routine.'
    },
    {
        id: 'all9',
        name: 'Aminos ALL9',
        category: 'Aminos',
        price: 179.99,
        image: 'Aminos.jpg',
        description: 'Amino acids in a convenient serving.'
    },
    {
        id: 'beast-aminos',
        name: 'Beast Aminos',
        category: 'Aminos',
        price: 299.99,
        image: 'Aminos(3).jpg',
        description: 'Amino acid supplement for active days.'
    },
    {
        id: 'creatine-3in1',
        name: 'Creatine 3 in 1',
        category: 'Creatine',
        price: 219.99,
        image: 'creatine.webp',
        description: 'Creatine blend for strength training.'
    },
    {
        id: 'creatine-mono',
        name: 'Creatine Monohydrate',
        category: 'Creatine',
        price: 299.99,
        image: 'Creatine.jpg',
        description: 'Creatine monohydrate for daily training routines.'
    },
    {
        id: 'creatine-transport',
        name: 'Creatine Transport',
        category: 'Creatine',
        price: 219.99,
        image: 'Creatine (2).jpg',
        description: 'Creatine blend designed for training support.'
    },
    {
        id: 'testo',
        name: 'Testo gH',
        category: 'Other',
        price: 229.99,
        image: 'Testo.jpg',
        description: 'A sports nutrition product. Review the label before use.'
    },
    {
        id: 'shaker-bundle',
        name: 'Shaker and Recovery Bundle',
        category: 'Other',
        price: 299.99,
        image: 'images (9) - Copy.jpg',
        description: 'A shaker and recovery bundle.'
    },
    {
        id: 'shaker',
        name: 'USN Shaker',
        category: 'Accessories',
        price: 90,
        image: 'shopping (1).webp',
        description: 'Reusable shaker bottle for mixing drinks.'
    }
];

const money = number => new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
}).format(number);

const readCart = () => {
    try {
        return JSON.parse(localStorage.getItem('usn-cart') || '[]');
    } catch {
        return [];
    }
};

const saveCart = items => {
    localStorage.setItem('usn-cart', JSON.stringify(items));
    updateCartCount();
};

function updateCartCount() {
    const count = readCart().reduce((total, item) => total + item.qty, 0);
    document.querySelectorAll('[data-cart-count]').forEach(element => {
        element.textContent = `Cart (${count})`;
    });
}

function addToCart(id) {
    const cart = readCart();
    const item = cart.find(cartItem => cartItem.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ id, qty: 1 });
    }

    saveCart(cart);

    const message = document.querySelector('[data-live-message]');
    if (message) {
        const productName = PRODUCTS.find(product => product.id === id)?.name || 'Item';
        message.textContent = `${productName} added to cart.`;
        message.hidden = false;
    }
}

function productCard(product) {
    const element = document.createElement('article');
    element.className = 'card product-card';
    element.innerHTML = `
        <img src="Images/${product.image}" alt="${product.name}" loading="lazy" data-lightbox>
        <span class="muted">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">${money(product.price)}</p>
        <button type="button" data-add="${product.id}">Add to cart</button>
    `;
    return element;
}

function renderProducts() {
    const list = document.querySelector('[data-product-list]');
    if (!list) return;

    const term = (document.querySelector('#search')?.value || '').trim().toLowerCase();
    const category = document.querySelector('#category')?.value || 'all';
    const sort = document.querySelector('#sort')?.value || 'name';

    const results = PRODUCTS.filter(product => {
        const matchesCategory = category === 'all' || product.category === category;
        const searchableText = `${product.name} ${product.category} ${product.description}`;
        return matchesCategory && searchableText.toLowerCase().includes(term);
    });

    results.sort((first, second) => {
        if (sort === 'price-low') return first.price - second.price;
        if (sort === 'price-high') return second.price - first.price;
        return first.name.localeCompare(second.name);
    });

    list.replaceChildren(...results.map(productCard));

    const count = document.querySelector('[data-results]');
    if (count) {
        count.textContent = `${results.length} product${results.length === 1 ? '' : 's'} found`;
    }
}

function renderCart() {
    const root = document.querySelector('[data-cart]');
    if (!root) return;

    const cart = readCart().filter(item => PRODUCTS.some(product => product.id === item.id));
    saveCart(cart);

    if (!cart.length) {
        root.innerHTML = `
            <div class="empty">
                <h2>Your cart is empty</h2>
                <p>Browse the catalogue to add products.</p>
                <a class="button" href="product.html">Shop products</a>
            </div>
        `;
        return;
    }

    let total = 0;
    root.innerHTML = '';

    for (const item of cart) {
        const product = PRODUCTS.find(entry => entry.id === item.id);
        total += product.price * item.qty;

        const row = document.createElement('div');
        row.className = 'cart-row';
        row.innerHTML = `
            <img src="Images/${product.image}" alt="">
            <div>
                <strong>${product.name}</strong><br>
                <span class="muted">${money(product.price)} each</span>
            </div>
            <label>
                Qty
                <input type="number" min="1" max="99" value="${item.qty}"
                    data-qty="${product.id}" aria-label="Quantity of ${product.name}">
            </label>
            <button type="button" class="remove" data-remove="${product.id}">Remove</button>
        `;
        root.append(row);
    }

    const totalElement = document.querySelector('[data-total]');
    if (totalElement) totalElement.textContent = money(total);

    document.querySelectorAll('[data-qty]').forEach(input => {
        input.addEventListener('change', () => {
            const cartItems = readCart();
            const cartItem = cartItems.find(entry => entry.id === input.dataset.qty);
            cartItem.qty = Math.min(99, Math.max(1, Number(input.value) || 1));
            saveCart(cartItems);
            renderCart();
        });
    });

    document.querySelectorAll('[data-remove]').forEach(button => {
        button.addEventListener('click', () => {
            const remainingItems = readCart().filter(item => item.id !== button.dataset.remove);
            saveCart(remainingItems);
            renderCart();
        });
    });
}

function showMessage(form, text, type = 'success') {
    let box = form.querySelector('.form-message');

    if (!box) {
        box = document.createElement('p');
        box.className = 'form-message';
        box.setAttribute('role', 'status');
        box.setAttribute('aria-live', 'polite');
        form.prepend(box);
    }

    box.className = `form-message ${type}`;
    box.textContent = text;
    box.hidden = false;
}

async function submitAjax(form) {
    const endpoint = form.dataset.endpoint
        || document.querySelector('meta[name="form-endpoint"]')?.content;
    if (!endpoint) return false;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });

        if (!response.ok) {
            throw new Error('The form service returned an error.');
        }

        showMessage(form, 'Thank you. Your message was submitted.');
        form.reset();
        return true;
    } catch (error) {
        showMessage(
            form,
            'We could not send your message. Check your connection or contact us by email.',
            'error'
        );
        return true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderProducts();
    renderCart();

    const total = readCart().reduce((sum, item) => {
        const productPrice = PRODUCTS.find(product => product.id === item.id)?.price || 0;
        return sum + productPrice * item.qty;
    }, 0);

    document.querySelectorAll('[data-total]').forEach(element => {
        element.textContent = money(total);
    });

    const featured = document.querySelector('[data-home-featured]');
    if (featured) {
        const featuredIds = ['whey', 'xts', 'creatine-mono', 'shaker'];
        featured.replaceChildren(...featuredIds.map(id => {
            return productCard(PRODUCTS.find(product => product.id === id));
        }));
    }

    document.querySelectorAll('#search, #category, #sort').forEach(element => {
        element.addEventListener('input', renderProducts);
    });

    document.addEventListener('click', event => {
        const addButton = event.target.closest('[data-add]');
        if (addButton) addToCart(addButton.dataset.add);

        const accordionToggle = event.target.closest('[data-accordion]');
        if (accordionToggle) {
            const panel = document.getElementById(accordionToggle.getAttribute('aria-controls'));
            const isOpen = accordionToggle.getAttribute('aria-expanded') === 'true';
            accordionToggle.setAttribute('aria-expanded', String(!isOpen));
            panel.hidden = isOpen;
        }

        const tab = event.target.closest('[data-tab]');
        if (tab) {
            document.querySelectorAll('[data-tab]').forEach(item => {
                item.setAttribute('aria-selected', String(item === tab));
            });
            document.querySelectorAll('[data-tab-panel]').forEach(panel => {
                panel.hidden = panel.id !== tab.dataset.tab;
            });
        }

        const image = event.target.closest('[data-lightbox]');
        if (image) {
            const lightbox = document.querySelector('[data-lightbox-modal]');
            lightbox.querySelector('img').src = image.src;
            lightbox.querySelector('img').alt = image.alt;
            lightbox.hidden = false;
            lightbox.querySelector('button').focus();
        }
    });

    document.querySelector('[data-lightbox-modal] button')?.addEventListener('click', () => {
        document.querySelector('[data-lightbox-modal]').hidden = true;
    });

    document.querySelector('[data-lightbox-modal]')?.addEventListener('click', event => {
        if (event.target.matches('[data-lightbox-modal]')) {
            event.currentTarget.hidden = true;
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            const lightbox = document.querySelector('[data-lightbox-modal]');
            if (lightbox) lightbox.hidden = true;
        }
    });

    document.querySelectorAll('form[data-demo-form]').forEach(form => {
        form.addEventListener('submit', async event => {
            event.preventDefault();
            if (!form.reportValidity()) return;

            const name = form.elements.name?.value.trim();
            if (name && name.length < 2) {
                showMessage(form, 'Please enter a name with at least two characters.', 'error');
                form.elements.name.focus();
                return;
            }

            const phone = form.elements.phone;
            if (phone && phone.value && !/^\+?[0-9 ()-]{7,20}$/.test(phone.value.trim())) {
                showMessage(
                    form,
                    'Enter a valid phone number using 7 to 20 digits and common phone symbols.',
                    'error'
                );
                phone.focus();
                return;
            }

            if (form.dataset.formType === 'enquiry' || form.dataset.formType === 'contact') {
                const submitted = await submitAjax(form);
                if (submitted) return;
            }

            if (form.dataset.formType === 'enquiry') {
                const type = form.elements.topic.value;
                const responses = {
                    products: 'Our product catalogue shows current products and prices. Ask us about an item and we will guide you.',
                    services: 'We can help with product selection and sports nutrition questions. Please include your training goals.',
                    sponsor: 'Please tell us about your organisation, audience, and sponsorship proposal.',
                    volunteer: 'Thanks for your interest. Include your availability and the kind of support you can offer.'
                };

                showMessage(
                    form,
                    responses[type] || 'Thank you. Your enquiry is ready for our team. This demo does not send it to a server.'
                );
                form.reset();
                return;
            }

            if (form.dataset.formType === 'contact') {
                const formData = new FormData(form);
                const subject = encodeURIComponent(`Website message: ${formData.get('topic')}`);
                const body = encodeURIComponent(
                    `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nPhone: ${formData.get('phone') || 'Not provided'}\n\n${formData.get('message')}`
                );

                showMessage(
                    form,
                    'Your message is validated. Your email app will open so you can send it to info@ultimatesportsnutrition.co.za.'
                );
                window.location.href = `mailto:info@ultimatesportsnutrition.co.za?subject=${subject}&body=${body}`;
                return;
            }

            if (form.dataset.formType === 'checkout') {
                if (!readCart().length) {
                    showMessage(form, 'Your cart is empty. Add products before checkout.', 'error');
                    return;
                }

                showMessage(
                    form,
                    'Details validated. This demonstration does not process payments or place a live order.'
                );
            }
        });
    });
});
