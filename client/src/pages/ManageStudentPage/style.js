import { css } from "@emotion/react";
import { COLORS } from "styles/colors";

export const main = css({
    // width : "100vw",
    height: "calc(100vh - 5.5rem)",
    display: "block",
    backgroundColor: "#F5F5F5",
});

export const mainSize = css({
    width : "100vw",
    height : "65vh",
    backgroundColor : "#F5F5F5",
    display : 'flex',
    justifyContent : 'center',
    alignItem : 'center',
    marginTop: "3rem",
});

export const subTitleStyle = css({
    fontSize : "24px",
    fontWeight : 'bold',
    color : "#008573",
    paddingTop: "4rem",
    marginBottom : "0.8%",
    marginLeft : "10%",
});

export const subBackgroundStyle = css({
    width : "80vw",
    height : "63vh",
    borderRadius: "0.8rem",
    backgroundColor : "white",
});

export const tableSize = css({
    width : "70vw",
    // height : "46vh",
    marginTop : "5.5vh",
    marginLeft : "7%",
    fontWeight: "bold",
});

export const colSizeMostShort = css({
    width : "4vw",
    height : '4vh',
});

export const colSizeShort = css({
    width : "7vw",
    height : '4vh',
});

export const colSizeMedium = css({
    width : "14vw",
    height : '4vh',
});

export const colSizeLong = css({
    width : "16vw",
    height : '4vh',
});

export const thStyle= css({
    width : '2vw',
    height : "4vh",
    fontWeight : "bold",
    textAlign : "left",
    backgroundColor : '#F5F5F5',
    borderTop: '0.5px solid #ddd',
    borderLeft: '0.5px solid #ddd',
    borderRight: '0.5px solid #ddd',
    borderBottom: '3px solid #ddd',
    padding: '1vh',    
    textAlign: 'left',
});
  
export const tdStyle= css({
    width : '2vw',
    height : '4vh',
    textAlign : "left",
    backgroundColor : '#FEFEFE',
    border: '1px solid #ddd',
    padding: '1vh',
    verticalAlign: "middle",
});

export const tdInputSylte = css({
    width : "96%",
    height : "20px",
})

export const studentAddBtnStyle= css({
    width : "70vw",
    height : "5vh",
    fontWeight : "600",
    fontSize : "2vh",
    textAlign : "center",
    color : "#008573",
    backgroundColor : "#FEFEFE",
    borderRadius: "1rem",
    border: '2px dashed #ddd',
    marginTop : "2%",
    marginLeft : "7%",
});

export const btnImgStyle = css({
    width : '2vw',
    height : '2vw',
})

export const pageStyle = css({
    // display : 'flex',
    // justifyContent : 'center',
    // alignItem : 'center',
    marginTop : '1.5%',
    fontWeight : 'bold',
    fontSize: "1.25rem",
    weight : "10px",
    textAlign : 'center',
})

export const editBtnStyle= css({
    paddingLeft : "0.3vw",
})
