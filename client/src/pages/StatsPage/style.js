import { css } from "@emotion/react";
import { COLORS } from "styles/colors";

export const mainBackground = css({
    width : "100vw",
    height : "90.6vh",
    backgroundColor : "#F5F5F5",
    display : "flex",
    justifyContent : "center",
    alignItem : "center",

});

export const subTextStyle = css({
    fontSize : "24px",
    fontWeight : 'bold',
    color : "#008573",
    marginTop : "3%",
    marginBottom : "0.8%",
});

export const searchBackground = css({
    width : "70vw",
    height : "20vh",
    borderRadius : "1rem",
    backgroundColor : "white",
    display: "table-cell",
    verticalAlign : 'middle',
    display : "flex",
    justifyContent : "center",
    alignItem : "center",
});

export const searchDivStyle = css({
    width : "12vw",
    float: 'left',
    marginTop : '6vh',
    marginBottom : "3vh",
    marginLeft : "2vw",
})

export const searchTextStyle = css({
    fontSize : "17px",
    color : "grey",
    marginBottom : "0.5vh",
    fontWeight : "600",
})

export const searchInputStyle = css({
    width : "12vw",
    height : "3vh",
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: "3px solid grey",
    fontWeight : 'bold',
})

export const searchBtnStyle = css({
    width : "8vw",
    height : "6vh",
    fontSize : "16px",
    border : '1px solid #008573',
    borderRadius : "3.25rem",
    color : "white",
    backgroundColor : "#008573",
    fontWeight : "bold",
})

export const resultBack = css({
    width : "70vw",
    height : "53vh",
    marginTop : "3vh",
    backgroundColor : "white",
    borderRadius : "1.3rem",
})

export const resultTextStyle = css({
    fontSize : "1vw",
    paddingRight : "2.4vw",
    paddingTop : "2vw",
    paddingBottom : "1vw",
    fontWeight : "bold",
    textAlign : 'right',
})

export const colShort = css({
    width : "2vw",
})

export const colLong = css({
    width : "4vw",
})

export const tableBackground = css({
    display : 'flex',
    justifyContent : 'center',
    alignItem : "center",
})

export const tableStyle = css({
    width : "66vw",
})

export const thStyle= css({
    width : "24vw",
    height : "4vh",
    fontWeight : "bold",
    textAlign : "left",
    verticalAlgin : "middle",
    padding: '1vh',
    borderBottom: '3px solid #ddd',
    borderTop: '3px solid #ddd',
    backgroundColor : '#f5f5f5',
});

export const tdStyle= css({
    width : "24vw",
    height : "4vh",
    // fontWeight : "bold",
    textAlign : "left",
    verticalAlgin : "middle",
    // fontSize : '0.85vw',
    padding: '1vh',
    borderBottom: '1.5px solid #ddd',
});

export const resultThStyleLong = css({
    width : '30%',
    height : '4vh',
    fontWeight : "bold",
    textAlign : "left",
    verticalAlgin : "middle",
    padding: '1vh',
    borderBottom: '3px solid #ddd',
    borderTop: '3px solid #ddd',
    backgroundColor : '#f5f5f5',
})

export const resultTdStyleLong= css({
    width : "30%",
    height : "4vh",
    // fontWeight : "bold",
    textAlign : "left",
    verticalAlgin : "middle",
    padding: '1vh',
    borderBottom: '1.5px solid #ddd',
});

export const resultThStyleShort = css({
    width : '20%',
    height : '4vh',
    fontWeight : "bold",
    textAlign : "left",
    verticalAlgin : "middle",
    padding: '1vh',
    borderBottom: '3px solid #ddd',
    borderTop: '3px solid #ddd',
    backgroundColor : '#f5f5f5',
    
})

export const resultTdStyleShort= css({
    width : "20%",
    height : "4vh",
    // fontWeight : "bold",
    textAlign : "left",
    verticalAlgin : "middle",
    padding: '1vh',
    borderBottom: '1.5px solid #ddd',
    
});

export const detailBtnStyle = css({
    width : "40%",
    fontSize : "2vh",
    color : 'white',
    borderRadius : '3.75rem',
    backgroundColor : '#C4C8CB',
})

export const detailColStyle  = css({
    width : "20%",
})

export const detailColMediumStyle  = css({
    width : "12%",
})

export const detailColShortStyle  = css({
    width : "5%",
})

export const detailColMostShortStyle  = css({
    width : "4%",
})

export const detailResultBack = css({
    width : "70vw",
    height : "70vh",
    marginTop : "5vh",
    backgroundColor : "white",
    borderRadius : "1.3rem",
})

export const tbodyBackground = css({
    display : 'flex',
    justifyContent : 'center',
    alignItem : "center",
    // flexDirection: "column",
    maxHeight : "30vh",
    overflowY: "auto",
    fontWeight : 'bold',
})


export const theadyBackground = css({
    display : 'flex',
    justifyContent : 'center',
    alignItem : "center",
})

export const detailTableBackground = css({
    // display : 'flex',
    // justifyContent : 'center',
    // alignItem : "center",
    marginLeft : '1.8vw',
    maxHeight : "44vh",
    overflowY: "auto",
    fontWeight : 'bold',
})

export const detailTheadyBackground = css({
    // display : 'flex',
    // justifyContent : 'center',
    // alignItem : "center",
    marginLeft : '1.8vw',
})

export const detailCloseStye = css({
    display : 'flex',
    justifyContent : 'center',
    alignItem : "center",
    paddingTop : "2.9vh",
})

export const detailCloseBtn = css({
    fontSize : '15px',
    backgroundColor : "#008573",
    borderRadius : "3.275rem",
    color : "white",
    fontWeight : 'border',
    width : "5vw",
    height : '4vh'
})

export const detailTitleStyle = css({
    marginTop : '4vh',
    marginLeft : '2vw',
    marginBottom : '1vh',
})

export const dropDownStyle = css({
    display : 'flex',
    justifyContent : 'right',
    alignItem : 'right',
    marginRight : "3.3%",
    fontWeight : '600',
})

export const dropDownResetBtn = css({
    marginLeft : "0.5%",
    fontWeight : '600',
})