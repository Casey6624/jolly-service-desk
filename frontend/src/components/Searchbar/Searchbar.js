import React, { Fragment, useState } from "react"
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from '@material-ui/core/InputAdornment';
import Clear from '@material-ui/icons/Clear';

export default function Searchbar({ value, onchange, classes, clearInput }) {

    const [hover, setHover] = useState(false)

    return (
        <Fragment>
            <FormControl fullWidth >
                <Input
                    style={{ margin: 8, width: "100%", cursor: "pointer" }}
                    value={value}
                    placeholder="Search By Task Name"
                    fullWidth
                    onChange={onchange}
                    endAdornment={
                        <InputAdornment position="end">
                            <Clear aria-label="Clear Search Query" onClick={clearInput} style={{
                                color: hover ? "#ef7d00" : "grey"
                            }}
                                onMouseEnter={() => setHover(!hover)}
                                onMouseLeave={() => setHover(!hover)}
                            />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Fragment>
    )
}