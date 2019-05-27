import React, { Fragment } from "react"
import TextField from "@material-ui/core/TextField";

export default function Searchbar({ value, onchange }) {
    return (
        <Fragment>
            <TextField
                id="standard-full-width"
                label="Search By Task name"
                style={{ margin: 8 }}
                placeholder="E.g Reboot Server"
                helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true
                }}
                value={value}
                onChange={onchange}
            />
        </Fragment>
    )
}