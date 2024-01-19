import themeColor from "@/components/constant/color";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Drawer,
  TextField,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import CustomLink from "../link";
const Typography = dynamic(() => import("@mui/material/Typography"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const InputAdornment = dynamic(() => import("@mui/material/InputAdornment"));
import { FaFilter } from "@react-icons/all-files/fa/FaFilter";
import { useRouter } from "next/router";

const drawerWidth = 240;

function FilterList(props: FilterProps) {
  const { filters, params, handleAction, setFilterParam } = props;
  const router = useRouter();

  const [form_data, setFormData] = useState(params as any);
  const [open, setOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterValueProps[]>(
    params?.filter ?? []
  );
  const handleChange = (newValue: number, key: string) => {
    setFormData({
      ...form_data,
      price: {
        ...form_data.price,
        [key]: newValue,
      },
    });
  };

  // Function to check if item exists in array using filter
  const checkItem = (itemToCheck: FilterValueProps) => {
    const foundItem = selectedFilters.filter(
      (item) => JSON.stringify(item) === JSON.stringify(itemToCheck)
    );
    let check = foundItem.length > 0;

    return check; // Returns true if item exists, false otherwise
  };

  const handleFilter = (param: FilterValueProps) => {
    if (checkItem(param)) {
      // Item exists, so delete it from the array
      const filteredItems = selectedFilters.filter(
        (existingItem) => JSON.stringify(existingItem) !== JSON.stringify(param)
      );
      setSelectedFilters(filteredItems);
    } else {
      // Item doesn't exist, so add it to the array
      setSelectedFilters((prevItems) => [...prevItems, param]);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setFormData({
      ...form_data,
      filter: selectedFilters,
    });
  }, [selectedFilters]);

  const handleQueryParamUpdate = () => {
    const queryParams = {
      ...router.query,
      keys: JSON.stringify(form_data),
    };
    router
      .push({
        pathname: router.pathname,
        query: queryParams,
      })
      .then(() => router.reload());
  };

  return (
    <Grid display={"flex"} position={"relative"} justifyContent={"flex-end"}>
      <Grid position={"absolute"} top={10} right={10} px={3}>
        <CustomLink
          action={handleDrawerOpen}
          type={"text"}
          color={"primary"}
          size={"small"}
          width={"auto"}
          padding={0}
          endIcon={<FaFilter size={14} />}
        >
          <Typography
            variant="h6"
            fontWeight={"bold"}
            textTransform={"capitalize"}
            sx={{ display: {  md: "flex" } }}
          >
            Filter
          </Typography>
        </CustomLink>
      </Grid>

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
        <Grid position={"relative"} height={"100%"}>
          <Grid
            width={1}
            p={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ backgroundColor: themeColor.backgroundColor }}
          >
            <Typography variant="h5" color={"primary"} fontWeight={"bold"}>
              Filter
            </Typography>
            <CustomLink width={"auto"} padding={0} type="text" color={"error"}>
              <Typography variant="caption" color={"error"} fontWeight={"bold"}>
                Reset
              </Typography>
            </CustomLink>
          </Grid>
          <Grid px={2} py={4} container>
            <Grid item md={12}>
              <Typography variant="body1" color={"primary"} fontWeight={"bold"}>
                Price
              </Typography>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={1}
                py={2}
              >
                <TextField
                  size="small"
                  type="number"
                  label="Min Price"
                  fullWidth
                  inputProps={{
                    max: form_data.price?.max ?? 0,
                    style: { textAlign: "center", fontSize: 14 },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  sx={{ textAlign: "center" }}
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
                  label="Max Price"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  inputProps={{
                    min: form_data.price?.min,
                    style: { textAlign: "center", fontSize: 14 },
                  }}
                  sx={{ textAlign: "center" }}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    let newValue = parseFloat(event.target.value);
                    handleChange(newValue, "max");
                  }}
                  value={form_data.price?.max ?? 0}
                />
              </Grid>
            </Grid>
            {filters &&
              filters.map((item, key) => {
                return (
                  <Grid key={key} item md={12}>
                    <Card elevation={0}>
                      <CardHeader
                        sx={{
                          p: 0,
                        }}
                        title={
                          <Typography
                            variant="body1"
                            fontWeight={"bold"}
                            color={themeColor.primary.dark}
                          >
                            {item.title}
                          </Typography>
                        }
                      ></CardHeader>
                      <CardContent
                        sx={{
                          p: 0.5,
                        }}
                      >
                        <Grid display={"flex"} gap={2}>
                          {item.values.map((param, key1) => {
                            return (
                              <Button
                                key={key1}
                                size="small"
                                variant="contained"
                                color={
                                  JSON.stringify(selectedFilters).includes(
                                    JSON.stringify(param)
                                  )
                                    ? "primary"
                                    : "inherit"
                                }
                                onClick={() => {
                                  handleFilter(param);
                                }}
                              >
                                {param.value}
                              </Button>
                            );
                          })}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
          <Grid
            position={"absolute"}
            bottom={20}
            left={0}
            right={0}
            p={2}
            display={"flex"}
            justifyContent={"center"}
            sx={{ backgroundColor: themeColor.mainBackground }}
          >
            <CustomLink
              type="contained"
              color={"primary"}
              padding={"auto"}
              width={300}
              action={() => {
                // handleAction(1, form_data, handleDrawer);
                // handleDrawerClose();
                handleQueryParamUpdate();
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
