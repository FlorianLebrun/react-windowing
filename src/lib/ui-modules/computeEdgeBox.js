
const defaultMargin = 5

function computeHorizontalEdgeBox(position: number, element: HTMLElement, tracked: DOMRect, host: DOMRect): Object {
  const { style } = element
  // Vertical position
  var top_0 = tracked.top - host.top
  var top_1 = host.bottom - tracked.top
  var bottom_0 = tracked.bottom - host.top
  var bottom_1 = host.bottom - tracked.bottom
  var minHeight = element.scrollHeight
  // Horizontal position
  var left_0 = tracked.left - host.left
  var left_1 = host.right - tracked.left
  var right_0 = tracked.right - host.left
  var right_1 = host.right - tracked.right
  var minWidth = element.scrollWidth

  // Adapt the position
  // ------------------------------------
  // Left edge
  if (position & 2) {
    if (left_0 < minWidth && left_0 < right_1) {
      position ^= 2
    }
  }
  // Right edge
  else {
    if (right_1 < minWidth && right_1 < left_0) {
      position ^= 2
    }
  }
  // Up orientation
  if (position & 4) {
    if (bottom_0 < minHeight && bottom_0 < top_1) {
      position ^= 4
    }
  }
  // Down orientation
  else {
    if (top_1 < minHeight && top_1 < bottom_0) {
      position ^= 4
    }
  }


  // Update the style
  // ------------------------------------
  // Left edge
  if (position & 2) {
    style.left = "auto"
    style.right = left_1 + "px"
    style.width = "auto"
    style.maxWidth = (left_0 - defaultMargin) + "px"
  }
  // Right edge
  else {
    style.left = right_0 + "px"
    style.right = "auto"
    style.width = "auto"
    style.maxWidth = (right_1 - defaultMargin) + "px"
  }
  // Up orientation
  if (position & 4) {
    style.top = "auto"
    style.bottom = bottom_1 + "px"
    style.height = "auto"
    style.maxHeight = (bottom_0 - defaultMargin) + "px"
  }
  // Down orientation
  else {
    style.top = top_0 + "px"
    style.bottom = "auto"
    style.height = "auto"
    style.maxHeight = (top_1 - defaultMargin) + "px"
  }
}

function computeVerticalEdgeBox(position: number, element: HTMLElement, tracked: DOMRect, host: DOMRect): Object {
  const { style } = element
  // Vertical position
  var top_0 = tracked.top - host.top
  var top_1 = host.bottom - tracked.top
  var bottom_0 = tracked.bottom - host.top
  var bottom_1 = host.bottom - tracked.bottom
  var minHeight = element.scrollHeight
  // Horizontal position
  var left_0 = tracked.left - host.left
  var left_1 = host.right - tracked.left
  var right_0 = tracked.right - host.left
  var right_1 = host.right - tracked.right
  var minWidth = element.scrollWidth

  // Adapt the position
  // ------------------------------------
  // Top edge
  if (position & 2) {
    if (top_0 < minHeight && top_0 < bottom_1) {
      position ^= 2
    }
  }
  // Bottom edge
  else {
    if (bottom_1 < minHeight && bottom_1 < top_0) {
      position ^= 2
    }
  }
  // Left orientation
  if (position & 4) {
    if (right_0 < minWidth && right_0 < left_1) {
      position ^= 4
    }
  }
  // Right orientation
  else {
    if (left_1 < minWidth && left_1 < right_0) {
      position ^= 4
    }
  }

  // Update the style
  // ------------------------------------
  // Top edge
  if (position & 2) {
    style.top = "auto"
    style.bottom = top_1 + "px"
    style.height = "auto"
    style.maxHeight = (top_0 - defaultMargin) + "px"
  }
  // Bottom edge
  else {
    style.top = bottom_0 + "px"
    style.bottom = "auto"
    style.height = "auto"
    style.maxHeight = (bottom_1 - defaultMargin) + "px"
  }
  // Left orientation
  if (position & 4) {
    style.left = "auto"
    style.right = right_1 + "px"
    style.width = "auto"
    style.maxWidth = (right_0 - defaultMargin) + "px"
  }
  // Right orientation
  else {
    style.left = left_0 + "px"
    style.right = "auto"
    style.width = "auto"
    style.maxWidth = (left_1 - defaultMargin) + "px"
  }
}

const positionsMap = {
  "down-left": 1,
  "down-right": 5,
  "up-left": 3,
  "up-right": 7,
  "left-up": 6,
  "left-down": 2,
  "right-up": 4,
  "right-down": 0,
}

// Position description:
// - Axis => (0) horizontal, (1) vertical
// - Axis direction => (0) default side, (2) other side
// - Cross axis alignement => (0) default side, (4) other side
export function computeEdgeBox(position: string, element: HTMLElement, tracked: DOMRect, host: DOMRect): Object {
  position = positionsMap[position]
  if (position === undefined) position = positionsMap["down-left"]
  if (position & 1) {
    return computeVerticalEdgeBox(position, element, tracked, host)
  }
  else {
    return computeHorizontalEdgeBox(position, element, tracked, host)
  }
}

export function computeEdgeBoxDOM(position: string, element: HTMLElement, trackedElement: HTMLElement, hostElement: HTMLElement): Object {
  return computeEdgeBox(position, element, trackedElement.getBoundingClientRect(), hostElement.getBoundingClientRect())
}