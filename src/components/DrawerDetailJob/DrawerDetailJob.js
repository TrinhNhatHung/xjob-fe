import React, { useEffect } from "react";
import { Chip, Drawer } from "@material-ui/core";
import "./drawerDetailJob.css";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../../reducer/detailJobDrawer";
import { useCallback } from "react";
import { BusinessConst } from "../../constant/BusinessConst";
import SellIcon from '@mui/icons-material/Sell';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import {openDialog} from "../../reducer/proposalDialog";

function DrawerDetailJob(props) {
  const detailJobDrawer = useSelector((state) => state.detailJobDrawer);
  const dispatch = useDispatch();

  const keyDown = useCallback(
    (event) => {
      if (event.code === "Escape") {
        dispatch(closeDrawer());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyDown);
    return () => document.removeEventListener("keydown", keyDown);
  }, [keyDown]);

  const submitProposal = (event)=> {
    event.stopPropagation();
    dispatch(openDialog());
  }

  const renderPostInfo = () => {
    let hourPerWeek = detailJobDrawer.post.hourPerWeek;
    let paymentKind = detailJobDrawer.post.paymentKind;
    let termClass = detailJobDrawer.post.termClass;
    let termFrom = detailJobDrawer.post.termFrom;
    let termTo = detailJobDrawer.post.termTo;
    let price = detailJobDrawer.post.price;
    if (paymentKind === BusinessConst.PAYMENT_KIND_FIXED_PRICE) {
      return <div className="detailJobDrawerInfo row">
        <div className="col-4 d-flex flex-row">
            <SellIcon className="icon"/>
            <div>
                <div className="detailJobDrawerInfoText">${price}</div>
                <div className="detailJobDrawerInfoLabel">Giá cố định</div>
            </div>
        </div>
      </div>;
    } else {
      let duration = "ngày";
      if (termClass === BusinessConst.TERM_CLASS_YEAR){
        duration = "năm";
      } else if (termClass === BusinessConst.TERM_CLASS_MONTH){
        duration = "tháng";
      } else if (termClass === BusinessConst.TERM_CLASS_WEEK){
        duration = "tuần";
      }
      return <div className="detailJobDrawerInfo row">
        <div className="col-4 d-flex flex-row">
            <AccessTimeIcon className="icon"/>
            <div>
                <div className="detailJobDrawerInfoText">{price} VND</div>
                <div className="detailJobDrawerInfoLabel">Giá theo giờ</div>
            </div>
        </div>
        <div className="col-4 d-flex flex-row">
            <CalendarMonthIcon className="icon"/>
            <div>
                <div className="detailJobDrawerInfoText">{`${termFrom} tới ${termTo} ${duration}`}</div>
                <div className="detailJobDrawerInfoLabel">Thời gian dự án</div>
            </div>
        </div>
        <div className="col-4 d-flex flex-row">
            <AccessAlarmIcon className="icon"/>
            <div>
                <div className="detailJobDrawerInfoText">{`Khoảng ${hourPerWeek} giờ/tuần`}</div>
                <div className="detailJobDrawerInfoLabel">Số giờ trong tuần</div>
            </div>
        </div>
      </div>;
    }
  };
  return (
    <div id="detailJobDrawer">
      <Drawer
        open={detailJobDrawer.isOpen}
        anchor="right"
        variant="persistent"
        className="drawer"
        classes={{
          paper: "drawerPaper",
        }}
      >
        <div className="content">
          <div className="detailJobDrawerTitle d-flex justify-content-between">
            <span>{detailJobDrawer.post.title}</span>
            <button className="btn btnSubmitProposal" onClick={submitProposal}>Gửi ứng tuyển</button>
          </div>
          <div className="detailJobDrawerDetail" dangerouslySetInnerHTML={{__html: detailJobDrawer.post.detail}}>
          </div>
          {
            renderPostInfo()
          }
          <div className="skills d-flex flex-column">
            <span className="skillsTitle">Kĩ năng</span>
            <div>
              {detailJobDrawer.post.skills.map((skill, index) => {
                return (
                  <Chip
                    key={index}
                    className="skill"
                    label={skill}
                    component="a"
                    href="#chip"
                    clickable
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default DrawerDetailJob;
