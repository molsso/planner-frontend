import React from "react";
import './Panel.css';

function Panel({items}) {

    return (
        <div className="panel">
            {items.map(t =>
                <div key={t.id} className="panel-card">
                    {t.description}
                </div>
            )}
        </div>
    );
}

export default Panel;