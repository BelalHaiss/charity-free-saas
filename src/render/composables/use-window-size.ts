import {
  useWindowSize as useVueWindowSize,
  UseWindowSizeOptions,
} from "@vueuse/core";
import { computed } from "vue";

export const useWindowSize = (opt?: UseWindowSizeOptions) => {
  const { width, height } = useVueWindowSize(opt);

  const widthThatRespectOurDesign = computed(() => Math.min(width.value, 1500));
  return { width: widthThatRespectOurDesign, height };
};
