<?php

return [
    [
        "name" => "component.app",
        "type" => "mmDashboard",
        "scope" => [
            "columns" => [
                [
                    "class" => "col-12 col-md-2"
                ],
                [
                    "class" => "col-12 col-md-10"
                ]
            ]
        ],
        "props" => [
            "elements" => [
                [
                    'comp' => [
                        "name" => "sidenav",
                        "type" => "mmSidenav",
                        "props" => [
                            "class" => 'w-100'
                        ]
                    ],
                    "option" => [
                        "column" => 0
                    ]
                ],
                [
                    "comp" => [
                        "type" => "mmFlexLayout",
                        "props" => [
                            "class" => "flex-column flex-md-row",
                            "itemClass" => "col-sm-12 col-md-6",
                            "components" => [
                                [
                                    "comp" => [
                                        "type" => "mmGrid",
                                        "props" => [
                                            "class" => "gy-2",
                                            "components" => [
                                                [
                                                    "comp" => [
                                                        "type" => "mmTitlebar",
                                                        "props" => [
                                                            "label" => "Detail"
                                                        ]
                                                    ]
                                                ],
                                                [
                                                    "comp" => [
                                                        "type" => "mmTabs",
                                                        "props" => [
                                                            "active" => "properties",
                                                            "tabs" => [
                                                                [
                                                                    "label" => "Properties",
                                                                    "value" => "properties",
                                                                    "content" => [
                                                                        "name" => "prop-edit-form",
                                                                        "type" => "mmForm"
                                                                    ]
                                                                ]
                                                            ]
                                                        ]
                                                    ]
                                                ],
                                                [
                                                    "comp" => [
                                                        "name" => "preview",
                                                        "type" => "mmButton",
                                                        "props" => [
                                                            "class" => "float-end",
                                                            "label" => "Preview"
                                                        ]
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ],
                                [
                                    "comp" => [
                                        "type" => "mmGrid",
                                        "props" => [
                                            "class" => ["h-100", "flex-nowrap", "flex-column", "gy-2"],
                                            "components" => [
                                                [
                                                    "comp" => [
                                                        "type" => "mmTitlebar",
                                                        "props" => [
                                                            "label" => "Preview"
                                                        ]
                                                    ]
                                                ],
                                                [
                                                    "comp" => [
                                                        "name" => "preview",
                                                        "type" => "mmContent",
                                                        "props" => [
                                                            "class" => "px-2 h-100 position-relative"
                                                        ]
                                                    ],
                                                    "option" => [
                                                        "class" => "flex-1"
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ],
                    "option" => [
                        "column" => 1
                    ]
                ]
            ]
        ]
    ]
];