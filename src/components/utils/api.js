
export const GenerateNewToken = (props) => {
    try {
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify(props.payload);

        console.log("Request Headers:", myHeaders);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`http://3.237.3.113:3000/auth/generateNewToken`, requestOptions)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("access_token", JSON.stringify(res.data.accessToken));
                    window.instance = res.data.accessToken;
                    window.location.reload();
                    console.log(res);
                } else {
                    if (res?.message === "Token Invalid/Expired") {
                        localStorage.clear();
                        props.navigate("/")
                        window.location.reload()
                    }
                }
            });
    } catch (error) {
        console.log("Error:", error);
    }
};


