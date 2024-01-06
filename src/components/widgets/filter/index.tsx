import themeColor from "@/components/constant/color";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import CustomLink from "../link";
const Typography = dynamic(() => import("@mui/material/Typography"));
const Grid = dynamic(() => import("@mui/material/Grid"));
import { FaFilter } from "@react-icons/all-files/fa/FaFilter";

const drawerWidth = 240;

function FilterList(props: FilterProps) {
  const { filters, params, handleAction, setFilterParam } = props;
  
  const [form_data, setFormData] = useState(params as any);
  const [open, setOpen] = useState(false);
  const handleChange = (newValue: number, key: string) => {
    setFormData({
      ...form_data,
      price: {
        ...form_data.price,
        [key]: newValue,
      },
    });
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const name = event.target.name;
    let checkedItems = form_data.filter?.[name];
    if (checkedItems) {
      const currentIndex = checkedItems.indexOf(value);
      const newChecked = [...checkedItems];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setFormData({
        ...form_data,
        filter: {
          ...form_data.filter,
          [name]: newChecked,
        },
      });
    } else {
      const newChecked = [];
      newChecked.push(value);
      setFormData({
        ...form_data,
        filter: {
          ...form_data.filter,
          [name]: newChecked,
        },
      });
    }
  };

  const handleDrawer = (status: boolean) => {
    if (status) {
      handleDrawerOpen();
    } else {
      handleDrawerClose();
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid display={"flex"} justifyContent={"flex-end"}>
      <CustomLink
        action={handleDrawerOpen}
        type={"text"}
        color={"primary"}
        size={"small"}
        width={200}
        endIcon={<FaFilter size={14} />}
      >
        <Box sx={{ display: { sm: "flex", xs: "none" } }}>
          <Typography
            variant="h6"
            textTransform={"capitalize"}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            Filter
          </Typography>
        </Box>
      </CustomLink>

      <Drawer
        variant="temporary"
        anchor="right"
        open={open}
        sx={{
          width: { md: 400, xs: drawerWidth },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: { md: 400, xs: drawerWidth },
            boxSizing: "border-box",
          },
        }}
        onClose={handleDrawerClose}
      >
        <Grid p={3} position={"relative"}>
          <Typography variant="h5" color={"primary"}>
            Filter
          </Typography>
          <Grid container mt={5}>
            <Grid item md={12}>
              <Card elevation={0}>
                <CardHeader
                  sx={{
                    p: 0,
                  }}
                  title={
                    <Typography color={themeColor.secondary.light}>
                      Price
                    </Typography>
                  }
                ></CardHeader>
                <CardContent
                  sx={{
                    p: 0.5,
                  }}
                >
                  <Grid
                    display={"flex"}
                    justifyContent={"space-evenly"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <TextField
                      size="small"
                      type="number"
                      inputProps={{
                        max: form_data.price?.max ?? 0,
                        style: { textAlign: "center", fontSize: 14 },
                      }}
                      sx={{ width: 150, textAlign: "center" }}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        let newValue = parseFloat(event.target.value);
                        handleChange(newValue, "min");
                      }}
                      value={form_data.price?.min ?? 0}
                    />
                    To
                    <TextField
                      size="small"
                      type="number"
                      inputProps={{
                        min: form_data.price?.min,
                        style: { textAlign: "center", fontSize: 14 },
                      }}
                      sx={{ width: 150, textAlign: "center" }}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        let newValue = parseFloat(event.target.value);
                        handleChange(newValue, "max");
                      }}
                      value={form_data.price?.max ?? 0}
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            {filters && filters.map((item, key) => {
              return (
                <Grid key={key} item md={12}>
                  <Card elevation={0}>
                    <CardHeader
                      sx={{
                        p: 0,
                      }}
                      title={
                        <Typography color={themeColor.secondary.light}>
                          {item.title}
                        </Typography>
                      }
                    ></CardHeader>
                    <CardContent
                      sx={{
                        p: 0.5,
                      }}
                    >
                      <Grid>
                        <FormGroup>
                          {item.values.map((param, key1) => {
                            return (
                              <FormControlLabel
                                sx={{ mt: 1 }}
                                key={key1}
                                name={`${item.id}`}
                                value={param.value}
                                checked={
                                  JSON.stringify(
                                    form_data.filter?.[item.id]
                                  )?.includes(param.value + "")
                                    ? true
                                    : false
                                }
                                control={
                                  <Checkbox
                                    value={param.value}
                                    onChange={(event) => {
                                      handleFormChange(event);
                                    }}
                                  />
                                }
                                label={param.value}
                              />
                            );
                          })}
                        </FormGroup>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Grid>
            <CustomLink
              type="contained"
              color={"primary"}
              action={() => {
                setFilterParam(form_data);
                handleAction(1,form_data, handleDrawer);
                handleDrawerClose();
              }}
            >
              <Typography>Apply</Typography>
            </CustomLink>
          </Grid>
        </Grid>
      </Drawer>
    </Grid>
  );
}

export default FilterList;
