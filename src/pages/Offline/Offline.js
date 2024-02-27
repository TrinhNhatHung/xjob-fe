import React from "react";
import "./offline.css";
import OfflineIcon from '../../images/offline-icon.svg'

function Offline() {

    const tryReload = ()=> {
        window.location.reload();
    }

    return (
        <div className="offline d-flex flex-column align-items-center">
            <img className="offlineIcon mb-3" src={OfflineIcon} alt=""/>
            <span className="mb-2">Kết nối Internet</span>
            <span className="mb-2">Không có kết nối Internet. Vui lòng kiểm tra mạng</span>
            <div>
                <button className="btnOfflineTry" onClick={tryReload}>Thử lại</button>
            </div>
        </div>
    );
}

export default Offline;