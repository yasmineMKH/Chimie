import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function UpdateSession({ sessionId, sessionName }) {
  
    const [ouvert, setOuvert] = useState();

    useEffect(() => {
        fetch(`/sessions/${sessionId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch session data');
                }
                return response.json();
            })
            .then(session => {
              console.log('Session Est_ouverte:', session.id,session.Est_ouverte);
              const sessionIsOpen = session.Est_ouverte === "true" ? true : false;

                setOuvert(sessionIsOpen);
            })
            .catch(error => {
                console.error('Error fetching session data:', error);
            });
    }, [sessionId]);

    const handleOpenSession = async () => {
        try {
            const response = await Axios.put(`http://localhost:3002/sessions/${sessionId}/open`);
            setOuvert(true);
            alert('Session opened successfully');
        } catch (error) {
            console.error('Error opening session:', error);
            alert('Failed to open session');
        }
    };

    const handleCloseSession = async () => {
        try {
            const response = await Axios.put(`http://localhost:3002/sessions/${sessionId}/close`);
            setOuvert(false);
            alert('Session closed successfully');
        } catch (error) {
            console.error('Error closing session:', error);
            alert('Failed to close session');
        }
    };

    return (
        <div>
            <h2>Update Session Status for {sessionName}</h2>
            {console.log('Session Est_ouverte:',ouvert)}
            {ouvert ? (
                <button className="btn-sup" onClick={handleCloseSession}>Close Session</button>
            ) : (
                <button className="btn-ajout" onClick={handleOpenSession}>Open Session</button>
            )}
        </div>
    );
}

function UpdateSessions() {
    const sessions = [
        { id: 1, name: "Manifestation Scientifique Internationale " },
        { id: 2, name: "Séjour scientifique de courte durée de haut niveau" },
        { id: 3, name: "Stage de perfectionnement à l’étrangé" },
        { id: 4, name: "Session CSF" }
    ];

    return (
        <div>
            {sessions.map(session => (
                <UpdateSession key={session.id} sessionId={session.id} sessionName={session.name} />
            ))}
        </div>
    );
}

export default UpdateSessions;


