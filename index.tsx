import { Collapse } from "antd";
import CollapseArrowDownIcon from "./assets/collapse-arrow-down.svg";
import GreenSimpleTick from "./assets/green-simple-tick.svg";
import StepFinishCheck from "./assets/step-finish-check.svg";
import "./custom-stepper.scss"; // Extract CSS here

const Stepper = ({
  rootClassName,
  steps,
  activeStep,
  stepAccordionActiveId,
  onStepClick,
  stepperState,
  updateAccordionActiveId,
}: {
  rootClassName?: string;
  steps: any[];
  activeStep: number | string;
  stepAccordionActiveId?: any;
  onStepClick: (id: string | number) => void;
  stepperState: Record<string, unknown | any>;
  updateAccordionActiveId?: (id: string | number | null) => void;
}) => {
  function generateListOfSteper() {
    return steps?.map((item: any) => {
      return {
        ...item,
        status: stepperState[item.dataKey].status,
        disabled: stepperState[item.dataKey].disable || false,
      };
    });
  }

  return (
    <div className={`custom-vertical-stepper ${rootClassName}`}>
      {generateListOfSteper().map((item: any, index: number) => {
        if (item.isAccordion) {
          const v1 = item?.innerSubChilds?.map((i) => i.id) || [];
          const v2 =
            item?.innerSubChilds?.flatMap((child) => child?.childKeys ?? []) ||
            [];

          const isActive = item.isAccordion
            ? item.innerSubChilds?.some(
                (child: any) =>
                  child.id === activeStep ||
                  child.childKeys?.includes(activeStep)
              )
            : item.hasInnersteps
            ? item?.childKeys?.includes(activeStep)
            : item.id === activeStep;

          const stepItemClassName = `step-item step-item-${item.status} ${
            isActive ? "step-item-active" : ""
          }`;
          return (
            <button
              onClick={item.onClick}
              className={stepItemClassName}
              key={`customer-steps-id-${item.id}`}
              tabIndex={index} // Make the element focusable
              aria-pressed={[item.id, ...v1, ...v2].includes(activeStep)}
            >
              <div className="steps-item-container">
                <div className="steps-item-tail" />
                <div className="steps-item-icon flex justify-center items-center ">
                  {item.status === "finish" ? (
                    <img src={StepFinishCheck} className="" />
                  ) : null}
                </div>
                <div className="steps-item-content">
                  <Collapse
                    activeKey={stepAccordionActiveId}
                    expandIcon={({ isActive }) => {
                      return (
                        <img
                          src={CollapseArrowDownIcon}
                          alt="img"
                          width={"18px"}
                          className={`mt-2 ${
                            isActive ? "rotate-0" : "-rotate-90"
                          }`}
                        />
                      );
                    }}
                    expandIconPosition="end"
                    items={[
                      {
                        onClick: (e) => e?.stopPropagation(),
                        key: item.id,
                        headerClass: "p-0 mt-[3px] md:gap-x-6",
                        label: (
                          <div className="steps-item-title ">{item.title}</div>
                        ),
                        showArrow: true,
                        children: (
                          <div className="text-left">
                            {item?.innerSubChilds?.map(
                              (innerItem: any, index: number) => {
                                return (
                                  <div
                                    className={`${
                                      (item?.dataKey
                                        ? stepperState[item?.dataKey]?.[
                                            innerItem?.dataKey
                                          ]
                                        : stepperState[innerItem?.dataKey])?.[
                                        "status"
                                      ] === "finish"
                                        ? "flex items-center gap-x-2"
                                        : ""
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (
                                        !(
                                          item?.dataKey
                                            ? stepperState[item?.dataKey]?.[
                                                innerItem?.dataKey
                                              ]
                                            : stepperState[innerItem?.dataKey]
                                        )?.["disable"]
                                      ) {
                                        onStepClick(innerItem?.id);
                                      }
                                    }}
                                    key={`${item?.dataKey}-${index}`}
                                  >
                                    <div className="">
                                      {(item?.dataKey
                                        ? stepperState[item?.dataKey]?.[
                                            innerItem?.dataKey
                                          ]
                                        : stepperState[innerItem?.dataKey])?.[
                                        "status"
                                      ] === "finish" ? (
                                        <img src={GreenSimpleTick} />
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div
                                      key={index}
                                      className={`text-xs ${
                                        (item?.dataKey
                                          ? stepperState[item?.dataKey]?.[
                                              innerItem?.dataKey
                                            ]
                                          : stepperState[innerItem?.dataKey])?.[
                                          "status"
                                        ] === "finish" ||
                                        innerItem?.childKeys?.includes(
                                          activeStep
                                        )
                                      } ${
                                        activeStep === innerItem?.id ||
                                        innerItem?.childKeys?.includes(
                                          activeStep
                                        )
                                          ? " text-white/90 "
                                          : " text-white/50 "
                                      }  py-2`}
                                    >
                                      {innerItem?.title}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        ),
                      },
                    ]}
                    style={{ padding: 0 }}
                    bordered={false}
                    onChange={(e: any) => {
                      if (!item.disabled) {
                        updateAccordionActiveId(parseInt(e[1]));
                      }
                    }}
                  />
                </div>
              </div>
            </button>
          );
        } else {
          const isActive = item.hasInnersteps
            ? item?.childKeys?.includes(activeStep)
            : item.id === activeStep;
          const stepItemClassName = `step-item step-item-${item.status} ${
            isActive ? "step-item-active" : ""
          }`;
          return (
            <button
              onClick={
                item?.onClick ? item?.onClick : () => onStepClick(item.id)
              }
              className={stepItemClassName}
              key={`customer-steps-id-${item.id}`}
              tabIndex={index} // Make the element focusable
              aria-pressed={item.id === activeStep}
            >
              <div className="steps-item-container">
                <div className="steps-item-tail" />
                <div className="steps-item-icon flex justify-center items-center ">
                  {item.status === "finish" ? (
                    <img src={StepFinishCheck} className="" />
                  ) : null}
                </div>
                <div className="steps-item-content">
                  <div className="steps-item-title">{item.title}</div>
                </div>
              </div>
            </button>
          );
        }
      })}
    </div>
  );
};

export default Stepper;
