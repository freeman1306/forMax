import React, { Component } from "react";

import uniqueId from "lodash/uniqueId";
// material-ui components
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import AddIcon from "material-ui-icons/Add";
// react redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

// action creators
import { actions as postActions } from "../reducers/post";

class CreatePost extends Component {
  state = {
    item: {
      title: "",
      body: ""
    }
  };

  // handle change active item data
  handleChange = name => e => {
    this.setState({
      item: {
        ...this.state.item,
        [name]: e.target.value
      }
    });
  };

  //handle submit to update todo on redux state and go back to home

  handleSubmit = e => {
    e.preventDefault();
    const { item } = this.state;
    if (item.title && item.body) {
      const { postActions } = this.props;

      postActions.create({
        id: uniqueId(),
        title: item.title,
        body: item.body
      });

      this.setState({
        item: {
          title: "",
          body: ""
        }
      });

      this.goBack();
    }
  };

  //go back home
  goBack = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const { item } = this.state;

    return (
      <Grid item xs={12} sm={6}>
        <Typography align="center" type="display3">
          Create post
        </Typography>
        <Paper style={{ paddingLeft: 16, paddingRight: 16 }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Title"
              onChange={this.handleChange("title")}
              fullWidth
              margin="normal"
              value={item.title}
              autoComplete="off"
              autoFocus={true}
            />

            <TextField
              multiline
              label="Description"
              onChange={this.handleChange("body")}
              fullWidth
              margin="normal"
              value={item.body}
              autoComplete="off"
              autoFocus={false}
            />

            <IconButton aria-label="Create" onClick={this.handleSubmit}>
              <AddIcon />
            </IconButton>
          </form>
        </Paper>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(postActions, dispatch)
});

export default connect(null, mapDispatchToProps)(withRouter(CreatePost));
