import { styled, Tooltip, tooltipClasses } from "@mui/material";
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#7c97c1",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#7c97c1",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    fontSize: 13,
  },
}));
const ToolTip = ({
  title,
  children,
  arrow = true,
  placement = "bottom",
  ...props
}) => {
  return (
    <LightTooltip title={title} arrow={arrow} placement={placement} {...props}>
      {children}
    </LightTooltip>
  );
};

export default ToolTip;
