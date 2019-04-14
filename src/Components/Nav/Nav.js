import React, { useEffect } from "react"
import axios from "axios"

import { connect } from "react-redux"
import { updateUser } from "../../ducks/reducer"
import AccountImage from "./AccountImage/AccountImage"

//MaterialUI
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Menu from "./Menu/Menu"

const styles = {
  root: {
    // flexGrow: 1,
    overflow: "hidden",
    position: "relative",
    zIndex: 1
  },
  grow: {
    flexGrow: 1
  },
  navbar: {
    position: "relative",
    top: 0
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

function Nav(props) {
  useEffect(() => {
    handleCurrent()
  })

  function handleLogout() {
    try {
      props.auth.logout()
      axios.post("/auth/logout")
    } catch (err) {
      console.log(err)
    }
  }

  async function handleCurrent() {
    const { updateUser, history, location } = props
    const user = await axios.get("/auth/current")
    updateUser(user.data)
    if (user && location.pathname === "/") {
      history.push("/dashboard")
    }
  }

  const { classes, location } = props
  return (
    <div className={classes.root}>
      <AppBar className={classes.navbar}>
        <Toolbar>
          {location.pathname !== "/" && <Menu history={props.history} />}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            GameHub
          </Typography>
          {location.pathname === "/" ? (
            <Button onClick={props.auth.login} color="inherit">
              Login
            </Button>
          ) : (
            <AccountImage handleLogout={handleLogout} />
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  updateUser
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Nav))
