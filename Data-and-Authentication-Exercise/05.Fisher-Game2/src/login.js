window.addEventListener(`DOMContentLoaded`, () => {
    const form = document.querySelector(`form`);
    form.addEventListener(`submit`, onLogin);
});

async function onLogin(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const email = formData.get(`email`);
    const password = formData.get(`password`);

    try {
        const res = await fetch(`http://localhost:3030/users/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();

        const user = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };

        sessionStorage.setItem(`userData`, JSON.stringify(user));

        window.location = '/RemoteData and Authentication/05.Fisher-Game/index.html';
    } catch (err) {
        alert(err.message);
    }

}

