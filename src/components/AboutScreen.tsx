
const AboutScreen = () => {
    return (
        <div>
            <h1 className="m-2 m-md-4">About this project</h1>
            <div className="card m-2 m-md-4">
                <h4>Impressum</h4>
                <div className="text-primary">
                    <p>Project Name: IbraPloe Incidents</p>
                    <p>Developer: IbraPloe Dev Team</p>
                    <p>Contact: - </p>
                    <p>Location: HTW Berlin</p>
                </div>
            </div>
            <div className="card m-2 m-md-4">
                <h4>Privacy</h4>
                <div className="text-primary">
                    <p>We respect your privacy. 
                        Any personal data collected (e.g., during login) is used solely for the purpose of this application 
                        and is not shared with third parties.</p>
                    <p>This application stores authentication tokens securely 
                        and only processes necessary data to display and manage bicycle-related incidents.</p>
                    <p>If you have any questions about data handling, please contact us.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutScreen;