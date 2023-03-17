import axios from 'axios';
import { csvToObj } from 'csv-to-js-parser';
import { setMaxListeners } from 'process';
import React, { useState } from 'react'
import { CSVDownload, CSVLink } from 'react-csv';



// https://docs.google.com/spreadsheets/d/19cVduRo-yE5GV0_lKgyUJoEI37joXclh2fraG-eXmhE/edit#gid=0
export const Main = () => {
    const [inputLink, setInputLink] = useState("");
    const [csvData, setCsvData] = useState([])
    const [loading, setLoading] = useState(false);
    const handleGoogleLink = async (e) => {
        setLoading(true);
        // Converting CSV to object
        const response = await axios.get("https://docs.google.com/spreadsheets/d/19cVduRo-yE5GV0_lKgyUJoEI37joXclh2fraG-eXmhE/gviz/tq?tqx=out:csv&sheet=temp.csv");
        let arr = response.data.toString();
        let obj = csvToObj(arr);
        // extracting usernames form links 
        let usernames = [];
        const rx = /^(?:@|(?:https?:\/\/)?(?:www\.)?instagr(?:\.am|am\.com)\/)?(\w+)\/?$/
        obj.forEach((element) => {
            let match = rx.exec(element.Link)
            if (match) {
                usernames.push(match[1]);
            }
        })
        const dataResponse = await axios.post('https://temp-analytics.vercel.app/api/insights/profile/ig', { usernames })
        console.log(dataResponse);
        setCsvData(dataResponse.data.data.filter(obj => obj !== null && Object.values(obj).every(val => val !== null)));
        setLoading(false)
    };
    const csvHeaders = [
        { label: "Full Name", key: "name" },
        { label: "User Name", key: "username" },
        { label: "Profile Picture", key: "profilePicture" },
        { label: "Total followers", key: "follower" },
        { label: "Profile following", key: "following" },
        { label: "Total Posts", key: "totalContent" },
        { label: "Total Likes", key: "totalLikes" },
        { label: "Total comments", key: "totalComment" },
        { label: "SOCIAL", key: "service.type" },
        { label: "Average Engagement", key: "metaData.avgEngagement" },
        { label: "Average Like", key: "metaData.avgLikes" },
        { label: "Average Comments", key: "metaData.avgComment" },
        { label: "Average Post Per Day", key: "metaData.avgPostPerDay" },
        { label: "Average Post Per Week", key: "metaData.avgPostPerWeek" },
        { label: "Average Posts per months", key: "metaData.avgPostPerMonth" },
        // { label: "Profile image in B64", key: "profileB64" },    
    ]
    const handleButtonClick = async () => {
        const Response = await axios.get('https://temp-analytics.vercel.app');
        console.log(Response);
    }

    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor="inputEmail">Enter Google drive link</label>
                    <input type="text" className="form-control" id="inputEmail" placeholder="https://docs.google.com/spreadsheets/" onChange={(e) => {
                        setInputLink(e.target.value)
                    }} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleGoogleLink}>Submit</button>
                <hr className="hr my-3" />
                <div className="form-group">
                    <label htmlFor="inputCSV">Select CSV file</label>
                    <input type="file" className="form-control-file" id="inputCSV" />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleButtonClick}>Submit</button>
            </form>
            <CSVLink data={csvData} headers={csvHeaders}>{loading ? "Loading" : "Download CSV"}</CSVLink>;
        </>
    )
}
