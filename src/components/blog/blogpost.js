import { makeStyles } from '@material-ui/core/styles';
// import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import React, { Fragment , useState} from "react";
import { BrowserRouter as Router, Route, Link, Switch, useParams } from "react-router-dom";
import axios from "axios"
import Comments from "./comments"

const useStyles = makeStyles((theme) => ({
    darkblue: {
        color: "#2f2c7a",
        fontFamily: 'Playfair Display',
        fontSize: 50,
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 10
    },
    title: {
      color: "black",
      fontFamily: 'Merriweather',
      fontSize: 23
  },
  descriptext: {
      fontFamily: 'Lato',
      fontSize: 25,
      lineHeight: 2.5,
  },
  datetext: {
      fontFamily: 'Montserrat',
      fontSize: 17
  },
  conttext :{
      color: "#2f2c7a",
      fontFamily: 'Montserrat',
      fontSize: 17,
      textAlign: "left"
  },
  thecolor :{
      color: "#2f2c7a",
      fontSize: 18,
      alignItems: "flex-end"
  },
  quote:{
    color: "#29335C",
    fontFamily: 'Lato',
    fontSize: 35,
    lineHeight: 2.5,
    fontStyle: "italic"
  }
  }));

export default function BlogPost(props) {
  const classes = useStyles();
  const [post, setPost] = useState(null);

  const Loading = () =>{
    if (post === null) {
        console.log(props.location.state.postID )
        axios.get("http://localhost:8000/blog/get/post", {params : {id: props.location.state.postID }})
        .then((res)=> {
          setPost(res);
          console.log(res)
        }
        )
  }
}


  return (
<div style={{paddingTop: "9%"}}>
<h2 style={{marginLeft: 800}}> {Loading()}</h2>
<Button button component={Link}
        to="/Blog" style={{right:"27%"}}>← all posts</Button> 
<div>{post !== null ? 
 <div>
     {/* <div className={classes.datetext} >{post.data.date}</div>
    <div className={classes.darkblue}>{post.data.title}</div>
    <div display="flex" style={{flexDirection: "row"}}>
    <img style={{width: 600}} src={post.data.photo}></img>
    <h3>{post.data.description}</h3>
</div> */}
<div className={classes.datetext} >{post.data.date}</div>
<div className={classes.darkblue}>{post.data.title}</div>
        <img style={{float: "left", marginLeft: "400px", marginTop:"50px", paddingRight: 70}} src={post.data.photo}></img>
        <div  justifyContent="flex-start" >
        <pre className={classes.descriptext} 
        style={{textAlign: "justify", marginRight: "400px", marginLeft: "400px", marginTop:"50px", content:"\a", whiteSpace:"pre-line"}}>
            {post.data.fulltext}</pre>    
        <div className={classes.quote} 
        style={{textAlign: "justify", marginRight: "400px", marginLeft: "400px", marginTop:"50px",border: "solid", borderColor: "#c4d5c4"}}
        ><div style={{marginLeft:20, marginRight:20}}>"{post.data.quote}"</div></div>  
        <pre className={classes.descriptext} 
        style={{textAlign: "justify", marginRight: "400px", marginLeft: "400px", marginTop:"50px", content:"\a", whiteSpace:"pre-line"}}>
            {post.data.fulltext2}</pre>    
        <pre className={classes.descriptext} 
        style={{textAlign: "justify", marginRight: "400px", marginLeft: "400px",
        borderBottom: "solid", borderBottomColor: "#c4d5c4", borderBottomWidth: "thin",
        marginTop:"50px", content:"\a", whiteSpace:"pre-line"}}>
            <div style={{marginBottom:20}}>{post.data.fulltext3}</div></pre>    
        </div>
        <Comments theID={props.location.state.postID}></Comments>
</div> 


: "Loading"}</div>
</div>
  );
}