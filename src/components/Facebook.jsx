import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// import ReactFacebookLogin from "react-facebook-login";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FacebookLoginClient } from "@greatsumini/react-facebook-login";
import axios from "axios";
import styled from "styled-components";
import { Image } from "./Image";


const Page = styled.div({
    color: 'grey',
});

const Facebook = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("");
    const [userData, setUserData] = useState({});
    const [userPostData, setUserPostData] = useState([]);
    const [initParams, setInitParams] = useState({
        version: "v14.0",
        scope: "instagram_basic,pages_show_list,instagram_manage_insights,pages_show_list"
    })

    useEffect(() => {
        if (localStorage.getItem("sessionStorage")) {
            setIsLoggedIn(true);
            let sessionData = JSON.parse(
                localStorage.getItem("sessionStorage")
            );

            setUserID(sessionData.userID);
            setName(sessionData.name);
            setEmail(sessionData.email);
            setPicture(sessionData.picture);
        }
    }, []);

    const responseFacebook = (response) => {
        console.log(response);
        setIsLoggedIn(true);
        setUserID(response.userID);
        setName(response.name);
        setEmail(response.email);
        setPicture(response.picture.data.url);

        sessionStorage.setItem("userID", response.userID);
        sessionStorage.setItem("name", response.name);
        sessionStorage.setItem("email", response.email);
        sessionStorage.setItem("picture", response.picture.data.url);

        localStorage.setItem("sessionStorage", JSON.stringify(sessionStorage));
    };
    console.log(JSON.parse(
        sessionStorage.getItem("fbssls_793997521757662")
    )?.authResponse.accessToken);
    const componentClicked = (response) => {
        console.log("Button Click");
    };

    const logout = () => {
        //nullify the authResponse
        FacebookLoginClient.logout(() => {
            // console.log("logout");
            console.log(
                JSON.parse(sessionStorage.getItem("fbssls_793997521757662"))
                    .authResponse
            );
            let authResponse = JSON.parse(
                sessionStorage.getItem("fbssls_793997521757662")
            ).authResponse;

            //if it is null or logged out, then delete the sessions and other states
            if (!authResponse) {
                sessionStorage.clear();
                localStorage.clear();
                setIsLoggedIn(false);
            }
        });
    };
    const getPageData = async () => {
        let session = JSON.parse(sessionStorage.getItem("fbssls_793997521757662"))?.authResponse.accessToken;
        let reqOptions = {
            url: `https://graph.facebook.com/v16.0/me/accounts?access_token=${session}`,
            method: "GET",
        }
        let reqOptions2 = {
            url: `https://graph.facebook.com/v16.0/100246582770232?fields=instagram_business_account&access_token=${session}`,
            method: "GET",
        }

        let response = await axios.request(reqOptions);
        console.log(response.data.data[1].id);
        let response2 = await axios.request(reqOptions2);
        console.log(response2.data.instagram_business_account.id);
        let instagram_business_account = response2.data.instagram_business_account.id;
        let reqOptions3 = {
            url: `https://graph.facebook.com/v16.0/${instagram_business_account}/media?fields=id,media_type,caption,media_url,owner,timestamp,like_count,comments_count&access_token=${session}`,
            method: "GET",
        }
        let response3 = await axios.request(reqOptions3);
        console.log(response3.data.data);
        setUserPostData(response3.data.data);
    }

    let fbContent;

    if (isLoggedIn) {
        fbContent = (
            <div
                style={{
                    width: "800px",
                    margin: "10px",
                    background: "#f4f4f4",
                    color: "black",
                    padding: "20px",
                }}
            >
                <img src={picture} alt={name} />
                <h2>Welcome, {name} !</h2>
                Email: {email}
                <br />
                <button
                    style={{
                        padding: "10px 20px",
                        border: "none",
                        backgroundColor: "#3b5998",
                        color: "white",
                        borderRadius: "5px",
                        margin: "10px",
                        cursor: "pointer",
                    }}
                    onClick={logout}
                >
                    Logout
                </button>
                <button
                    style={{
                        padding: "10px 20px",
                        border: "none",
                        backgroundColor: "#3b5998",
                        color: "white",
                        borderRadius: "5px",
                        margin: "10px",
                        cursor: "pointer",
                    }}
                    onClick={getPageData}
                >
                    Fetch Page data
                </button>
                {userPostData.map(element => {
                    console.log(element);
                    return <Image key={element.id} media_url={element.media_url} caption={element.caption} comments_count={element.comments_count} like_count={element.like_count} permalink={element.permalink} />
                })}
            </div>
        );
    } else {
        fbContent = (
            <FacebookLogin
                appId="793997521757662"
                InitParams={initParams}
                style={{
                    backgroundColor: "#4267b2",
                    color: "#fff",
                    fontSize: "16px",
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "4px",
                }
                }
                onProfileSuccess={(response) => {
                    //get profile here
                    responseFacebook(response);
                }}
                onSuccess={(response) => {
                    setUserData(response);
                }}
                onLogout
            />
        );
    }
    return <div>{fbContent}</div>;
};

export default Facebook;