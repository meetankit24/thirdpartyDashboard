import * as React from 'react';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import { Typography, Box } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionUsage() {
    // State for REST API data
    const [restData, setRestData] = useState([]);
    const [restLoading, setRestLoading] = useState(true);
    const [restError, setRestError] = useState(null);

    // State for SOAP API data
    const [soapData, setSoapData] = useState([]);
    const [soapLoading, setSoapLoading] = useState(true);
    const [soapError, setSoapError] = useState(null);

    // Fetch REST API data
    useEffect(() => {
        fetch('/responses/rest')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setRestData(data);
                setRestLoading(false);
            })
            .catch(error => {
                console.error('Error fetching REST data:', error);
                setRestError(error);
                setRestLoading(false);
            });
    }, []);

    // Fetch SOAP API data
    useEffect(() => {
        fetch('/responses/soap')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setSoapData(data);
                setSoapLoading(false);
            })
            .catch(error => {
                console.error('Error fetching SOAP data:', error);
                setSoapError(error);
                setSoapLoading(false);
            });
    }, []);

    // Render REST API data
    const renderRestData = () => {
        if (restLoading) {
            return <div>Loading REST data...</div>;
        }

        if (restError) {
            return <div>Error fetching REST data: {restError.message}</div>;
        }

        return (
            <Accordion>
                <AccordionSummary><b> REST API </b></AccordionSummary>
                <AccordionDetails>
                    {Object.entries(restData).map(([apiName, apiDetails], index) => (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                    {/* API Name */}
                                    <Typography variant="h6" component="div" sx={{ color: '#000', fontWeight: 'bold' }}>
                                        {apiName} - {/* Display API name before URL */}
                                    </Typography>
                                    {/* Method */}
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{
                                            backgroundColor: '#50C878',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            marginLeft: 2
                                        }}
                                    >
                                        {apiDetails?.request?.method}
                                    </Typography>
                                    {/* API URL */}
                                    <Typography style={{ marginLeft: 10, marginRight: 10 }} variant="h6" component="div">
                                        {apiDetails.request.url}
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }} /> {/* This will push the next Typography to the right */}
                                    {/* Status Indicator */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor: apiDetails.response[0].status === 'success' || "success" ? 'green' : 'red',
                                                marginRight: 1,
                                            }}
                                        />
                                        <Typography variant="h6" component="div">
                                            {apiDetails.response[0].status === 'success' || "success" ? "success" : "fail"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <h3>Request Parameter</h3>
                                    <pre>{JSON.stringify(apiDetails.request, null, 2)}</pre>
                                </div>
                                <div>
                                    <h3>Responses</h3>
                                    {apiDetails.response.map((resp, respIndex) => (
                                        <div key={respIndex} style={{ backgroundColor: 'black', color: 'white', padding: '10px', marginBottom: '10px' }}>
                                            <Typography variant="subtitle1" component="div">
                                                Response {respIndex + 1}:
                                            </Typography>
                                            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                                {JSON.stringify(resp, null, 2)}
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </AccordionDetails>
            </Accordion>
        );
    };

    // Render SOAP API data
    const renderSoapData = () => {
        if (soapLoading) {
            return <div>Loading SOAP data...</div>;
        }

        if (soapError) {
            return <div>Error fetching SOAP data: {soapError.message}</div>;
        }

        return (
            <Accordion>
                <AccordionSummary><b> SOAP API </b></AccordionSummary>
                <AccordionDetails>
                    {Object.entries(soapData).map(([apiName, apiDetails], index) => (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                    {/* API Name */}
                                    <Typography variant="h6" component="div" sx={{ color: '#000', fontWeight: 'bold' }}>
                                        {apiName} - {/* Display API name before URL */}
                                    </Typography>
                                    {/* Method */}
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{
                                            backgroundColor: '#50C878',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            marginLeft: 2
                                        }}
                                    >
                                        {apiDetails?.request?.method}
                                    </Typography>
                                    {/* API URL */}
                                    <Typography style={{ marginLeft: 10, marginRight: 10 }} variant="h6" component="div">
                                        {apiDetails.request.url}
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }} /> {/* This will push the next Typography to the right */}
                                    {/* Status Indicator */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor: apiDetails.response[0].status === 'success' || "success" ? 'green' : 'red',
                                                marginRight: 1,
                                            }}
                                        />
                                        <Typography variant="h6" component="div">
                                            {apiDetails.response[0].status === 'success' || "success" ? "success" : "fail"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <h3>Request Parameter</h3>
                                    <pre>{JSON.stringify(apiDetails.request, null, 2)}</pre>
                                </div>
                                <div>
                                    <h3>Responses</h3>
                                    {apiDetails.response.map((resp, respIndex) => (
                                        <div key={respIndex} style={{ backgroundColor: 'black', color: 'white', padding: '10px', marginBottom: '10px' }}>
                                            <Typography variant="subtitle1" component="div">
                                                Response {respIndex + 1}:
                                            </Typography>
                                            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                                {JSON.stringify(resp, null, 2)}
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </AccordionDetails>
            </Accordion>
        );
    };

    return (
        <div>
            {renderRestData()}
            {renderSoapData()}
        </div>
    );
}
