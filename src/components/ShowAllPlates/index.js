import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  }));
  
 

const Generate =({plates})=> {
    const classes = useStyles();
        return (
            <div className='center ma' style={{width: "50%", marginBottom:'30px'}}>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Plate Number</TableCell>
                        <TableCell align="right">Created By</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {plates.map((row,i )=> (
                        
                        <TableRow key={i}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.userid}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Paper>
                </div>
        )
            
        
}

export default Generate;
